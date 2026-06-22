"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Tone = "success" | "error" | "info";
type ToastItem = { id: number; message: string; tone: Tone };

type Ctx = {
  push: (message: string, tone?: Tone) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastCtx = createContext<Ctx | null>(null);

/**
 * Lightweight toast provider — replaces window.alert. Renders a stack of
 * dismissable cards in the top-right; each auto-dismisses after ~4s.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, tone: Tone = "info") => {
      const id = ++idRef.current;
      setItems((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => remove(id), 4200);
    },
    [remove],
  );

  const value = useMemo<Ctx>(
    () => ({
      push,
      success: (m) => push(m, "success"),
      error: (m) => push(m, "error"),
    }),
    [push],
  );

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 380,
          pointerEvents: "none",
        }}
      >
        {items.map((t) => (
          <div
            key={t.id}
            onClick={() => remove(t.id)}
            role="status"
            style={{
              pointerEvents: "auto",
              padding: "12px 16px",
              borderRadius: 12,
              fontSize: 13.5,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "white",
              background:
                t.tone === "success"
                  ? "rgb(46, 142, 142)"
                  : t.tone === "error"
                    ? "rgb(var(--brand, 159 31 42))"
                    : "rgb(var(--ink, 18 22 32))",
              boxShadow: "0 12px 28px -10px rgba(18,22,32,0.32)",
              cursor: "pointer",
              animation: "lhf-toast-in 220ms ease",
            }}
          >
            {t.message}
          </div>
        ))}
        <style>{`
          @keyframes lhf-toast-in {
            from { transform: translateY(-8px); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast(): Ctx {
  const ctx = useContext(ToastCtx);
  if (ctx) return ctx;
  // Fallback outside provider — keep callers safe.
  return {
    push: (m) => console.warn("[toast outside provider]", m),
    success: (m) => console.warn("[toast outside provider]", m),
    error: (m) => console.warn("[toast outside provider]", m),
  };
}
