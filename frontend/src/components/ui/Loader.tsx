
export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="animate-spin h-8 w-8" viewBox="0 0 100 100">
        <circle
          className="opacity-40"
          cx="50"
          cy="50"
          r="45"
          stroke="black"
          strokeWidth="8"
          fill="none"
        />
        <circle
          className="opacity-75 stroke-current stroke-2"
          cx="50"
          cy="50"
          r="25"
        />
        <line
          className="opacity-75 stroke-current stroke-2"
          x1="50"
          y1="25"
          x2="50"
          y2="50"
        />
        <path
          className="opacity-75 stroke-current stroke-2"
          d="M 50 75 q 20 0 20 -20"
        />
      </svg>
    </div>

    // Loader V2
    // <div className="flex items-center justify-center">
    //   <svg className="animate-spin h-16 w-16" viewBox="0 0 24 24">
    //     <circle
    //       className="opacity-25"
    //       cx="12"
    //       cy="12"
    //       r="10"
    //       stroke="currentColor"
    //       strokeWidth="4"
    //     />
    //     <path
    //       className="opacity-75"
    //       fill="currentColor"
    //       d="M12 2.5v5h5a5 5 0 11-5-5zm0 19v-5h-5a5 5 0 115 5zm0-10a5 5 0 100-10 5 5 0 000 10z"
    //     />
    //     <circle
    //       className="opacity-75"
    //       cx="12"
    //       cy="12"
    //       r="1"
    //       fill="currentColor"
    //     >
    //       <animate
    //         attributeName="r"
    //         values="1; 4; 1"
    //         dur="1.2s"
    //         repeatCount="indefinite"
    //       />
    //       <animate
    //         attributeName="fill-opacity"
    //         values="1; 0; 1"
    //         dur="1.2s"
    //         repeatCount="indefinite"
    //       />
    //     </circle>
    //     <circle
    //       className="opacity-75"
    //       cx="12"
    //       cy="12"
    //       r="4"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //     >
    //       <animate
    //         attributeName="r"
    //         values="1; 4; 1"
    //         dur="1.2s"
    //         repeatCount="indefinite"
    //       />
    //       <animate
    //         attributeName="stroke-opacity"
    //         values="1; 0; 1"
    //         dur="1.2s"
    //         repeatCount="indefinite"
    //       />
    //     </circle>
    //   </svg>
    // </div>
  );
};
