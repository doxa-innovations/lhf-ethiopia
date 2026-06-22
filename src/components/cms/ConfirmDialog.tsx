"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Opts = {
  title: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type Ctx = (opts: Opts) => Promise<boolean>;

const ConfirmCtx = createContext<Ctx | null>(null);

/**
 * Promise-based confirm dialog — replaces window.confirm. Mount once at the
 * editor / admin shell; any descendant can `const confirm = useConfirm()`
 * then `if (await confirm({ title, body, destructive })) { … }`.
 */
export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<(Opts & { open: boolean }) | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const request = useCallback<Ctx>((opts) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setState({ ...opts, open: true });
    });
  }, []);

  const settle = (v: boolean) => {
    setState((s) => (s ? { ...s, open: false } : s));
    const r = resolverRef.current;
    resolverRef.current = null;
    r?.(v);
  };

  return (
    <ConfirmCtx.Provider value={request}>
      {children}
      <Dialog.Root
        open={state?.open ?? false}
        onOpenChange={(open) => {
          if (!open) settle(false);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(18, 22, 32, 0.42)",
              backdropFilter: "blur(4px)",
              zIndex: 300,
              animation: "lhf-confirm-overlay 160ms ease",
            }}
          />
          <Dialog.Content
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: 16,
              padding: "24px 26px 20px",
              maxWidth: 440,
              width: "calc(100vw - 32px)",
              zIndex: 301,
              boxShadow: "0 28px 64px -18px rgba(18,22,32,0.34)",
              fontFamily: "inherit",
              animation: "lhf-confirm-content 180ms ease",
            }}
          >
            <Dialog.Title
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "rgb(var(--ink, 18 22 32))",
                margin: 0,
              }}
            >
              {state?.title}
            </Dialog.Title>
            {state?.body ? (
              <Dialog.Description
                style={{
                  fontSize: 14,
                  color: "rgb(var(--ink-muted, 88 96 110))",
                  lineHeight: 1.55,
                  marginTop: 8,
                  marginBottom: 22,
                }}
              >
                {state.body}
              </Dialog.Description>
            ) : (
              <div style={{ height: 18 }} />
            )}

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => settle(false)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "1.5px solid rgb(var(--border-strong, 200 194 184))",
                  background: "white",
                  color: "rgb(var(--ink, 18 22 32))",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {state?.cancelLabel ?? "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => settle(true)}
                autoFocus
                style={{
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: state?.destructive
                    ? "1.5px solid rgb(var(--brand, 159 31 42))"
                    : "1.5px solid rgb(var(--ink, 18 22 32))",
                  background: state?.destructive
                    ? "rgb(var(--brand, 159 31 42))"
                    : "rgb(var(--ink, 18 22 32))",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {state?.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <style>{`
        @keyframes lhf-confirm-overlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lhf-confirm-content {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 8px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </ConfirmCtx.Provider>
  );
}

export function useConfirm(): Ctx {
  const ctx = useContext(ConfirmCtx);
  if (ctx) return ctx;
  // Fallback outside provider — sync-ish based on native confirm.
  return async (opts) => window.confirm(`${opts.title}${opts.body ? "\n\n" + opts.body : ""}`);
}
