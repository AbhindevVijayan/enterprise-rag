export default function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">

            <svg
                className="absolute h-full w-full opacity-[0.08]"
                xmlns="http://www.w3.org/2000/svg"
            >

                <defs>

                    <pattern
                        id="grid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M60 0H0V60"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.6"
                        />
                    </pattern>

                </defs>

                <rect
                    width="100%"
                    height="100%"
                    fill="url(#grid)"
                />

            </svg>

        </div>
    );
}