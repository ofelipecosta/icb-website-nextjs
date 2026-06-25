interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function WaveDivider({ from = "#0A1628", to = "#ffffff", flip = false }: WaveDividerProps) {
  return (
    <div
      style={{
        backgroundColor: from,
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 24"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 24 }}
      >
        <path
          d="M0,24 L1440,0 L1440,24 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
