import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const BirthdayLetter = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [hearts, setHearts] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      left: string;
      tx: string;
      size: number;
      delay: number;
      duration: number;
      bg: string;
    }>
  >([]);
  const [displayedText, setDisplayedText] = useState('');

  const fullText = `Chúc bạn một ngày sinh nhật thật vui vẻ và tràn đầy niềm vui! 🎈

Mong rằng tuổi mới này sẽ mang đến cho bạn thật nhiều sức khỏe, hạnh phúc và những điều tốt đẹp nhất trong cuộc sống. ✨

Chúc bạn luôn tươi trẻ, xinh đẹp và thành công trong mọi công việc! Hãy tận hưởng ngày đặc biệt này thật trọn vẹn nhé! 🌟

🎁 Happy Birthday! 🎊`;

  const handleEnvelopeClick = () => {
    if (isOpened) return;

    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 250 - 125,
      y: Math.random() * 250 - 125,
    }));

    setHearts(newHearts);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpened(true);
    }, 1500);

    setTimeout(() => {
      setHearts([]);
    }, 3500);
  };

  useEffect(() => {
    if (!isOpened) return;

    // generate a set of floating bubbles (cake bubbles) with random positions/sizes/colors
    const colors = [
      'rgba(255,182,193,0.95)', // light pink
      'rgba(255,240,173,0.95)', // light yellow
      'rgba(187,222,251,0.95)', // light blue
      'rgba(224,242,216,0.95)', // light green
      'rgba(237,231,246,0.95)', // light purple
    ];

    const newBubbles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 80 + 5}%`, // keep within 5%..85%
      tx: `${Math.random() * 80 - 40}px`, // small horizontal drift
      size: Math.floor(Math.random() * 16) + 10, // 10..25px
      delay: +(Math.random() * 2).toFixed(2),
      duration: +(Math.random() * 3 + 4).toFixed(2), // 4..7s
      bg: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBubbles(newBubbles);
  }, [isOpened]);

  // Typewriter effect for the letter text
  useEffect(() => {
    if (!isOpened) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');

    // Delay before starting typewriter to let the card settle
    const startDelay = setTimeout(() => {
      const typewriterInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
        }
      }, 40); // 40ms per character for smoother, more readable typing

      return () => clearInterval(typewriterInterval);
    }, 600);

    return () => clearTimeout(startDelay);
  }, [isOpened, fullText]);

  return (
    <div className="relative flex items-center justify-center">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none animate-heart-burst"
          style={
            {
              left: '50%',
              top: '50%',
              '--tx': `${heart.x}px`,
              '--ty': `${heart.y}px`,
            } as React.CSSProperties
          }
        >
          <Heart className="text-red-500 fill-red-500" size={24} />
        </div>
      ))}

      <div className="relative">
        {!isOpened ? (
          <div className="flex flex-col items-center gap-6">
            {/* Instruction text */}
            <div className="text-center">
              <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse mb-2">
                ✨ Click để mở thư ✨
              </p>
              <p className="text-sm text-gray-500 animate-bounce">
                👇 Nhấn vào phong bì 👇
              </p>
            </div>

            <div
              onClick={handleEnvelopeClick}
              className="cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative w-80 h-52">
                <div
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
                    isOpening ? 'opacity-0 scale-110 rotate-6' : 'opacity-100'
                  }`}
                >
                  <svg
                    viewBox="0 0 320 208"
                    className="w-full h-full drop-shadow-2xl"
                  >
                    <path
                      d="M10 10 L160 120 L310 10 L310 198 L10 198 Z"
                      fill="#f5e6d3"
                      stroke="#2c1810"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M10 10 L160 120 L310 10"
                      fill="none"
                      stroke="#2c1810"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M10 10 L160 120 L310 10 L160 10 Z"
                      fill="#e8d4b8"
                      stroke="#2c1810"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      className={isOpening ? 'animate-flap-open' : ''}
                      style={{ transformOrigin: '160px 10px' }}
                    />

                    <ellipse
                      cx="160"
                      cy="100"
                      rx="22"
                      ry="26"
                      fill="#ef4444"
                      stroke="#2c1810"
                      strokeWidth="2"
                    />

                    <path
                      d="M 160 85 Q 145 95 145 105 Q 145 115 160 125 Q 175 115 175 105 Q 175 95 160 85 Z"
                      fill="#dc2626"
                    />
                  </svg>
                </div>

                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-[1000ms] ease-in-out ${
                    isOpening
                      ? 'opacity-100 scale-110 rotate-12'
                      : 'opacity-0 scale-50'
                  }`}
                >
                  <div className="text-6xl animate-pulse">💌</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-letter-appear">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg shadow-2xl p-8 w-96 max-w-full border-4 border-amber-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>

              <div className="text-center mb-8">
                {/* Decorative top stars */}
                <div className="flex justify-center gap-3 mb-4">
                  {['✨', '🌟', '⭐', '💫', '✨'].map((star, i) => (
                    <span
                      key={i}
                      className="text-2xl animate-twinkle"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {star}
                    </span>
                  ))}
                </div>

                {/* Main title with animated gradient */}
                <div className="relative inline-block mb-3">
                  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-shift mb-2 drop-shadow-lg tracking-tight">
                    Chúc Mừng
                  </h1>
                  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 animate-gradient-shift-reverse drop-shadow-lg tracking-tight">
                    Sinh Nhật!
                  </h1>
                  <div className="absolute -top-2 -right-8 text-4xl animate-spin-slow">
                    🎂
                  </div>
                  <div className="absolute -bottom-2 -left-8 text-3xl animate-bounce-slow">
                    🎉
                  </div>
                </div>

                {/* Decorative hearts */}
                <div className="flex justify-center gap-2 my-4">
                  {[...Array(7)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-pink-400 fill-pink-400 animate-pulse-scale"
                      size={i === 3 ? 20 : 14}
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-pink-300 to-purple-300 animate-expand"></div>
                  <span className="text-xl">💝</span>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-purple-300 via-pink-300 to-transparent animate-expand"></div>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="text-lg whitespace-pre-wrap min-h-[300px] relative">
                  <span className="typewriter-text">
                    {displayedText.split('').map((char, index) => (
                      <span
                        key={index}
                        className="inline-block typewriter-char"
                        style={{
                          animationDelay: `${index * 0.04}s`,
                        }}
                      >
                        {char === '\n' ? <br /> : char}
                      </span>
                    ))}
                  </span>
                  {displayedText.length < fullText.length && (
                    <span className="inline-block w-[2px] h-6 bg-purple-500 animate-cursor-blink ml-[2px] align-middle"></span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    🎈
                  </span>
                ))}
              </div>
              {/* floating bubbles (cake bubbles) rendered above the edges of the card */}
              {bubbles.map((b) => {
                const bubbleStyle = {
                  left: b.left,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${b.duration}s`,
                  background: b.bg,
                  // custom property for horizontal translation
                  ['--tx']: b.tx,
                } as React.CSSProperties & Record<string, string>;

                return (
                  <span
                    key={b.id}
                    className="absolute pointer-events-none bubble"
                    style={bubbleStyle}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes heart-burst {
          0% {
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(45deg);
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes letter-appear {
          0% {
            transform: translateY(80px) scale(0.5) rotateX(-20deg);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1.05) rotateX(5deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes flap-open {
          0% {
            transform: rotateX(0deg);
          }
          30% {
            transform: rotateX(-60deg);
          }
          60% {
            transform: rotateX(-140deg);
          }
          80% {
            transform: rotateX(-170deg);
          }
          100% {
            transform: rotateX(-180deg);
          }
        }

        .animate-heart-burst {
          animation: heart-burst 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-letter-appear {
          animation: letter-appear 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-flap-open {
          animation: flap-open 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        /* cake bubble styles */
        @keyframes bubble-float {
          0% {
            transform: translateY(0) translateX(0) scale(0.95);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-220px) translateX(var(--tx)) scale(1.05);
            opacity: 0;
          }
        }

        .bubble {
          bottom: 10px;
          border-radius: 9999px;
          opacity: 0;
          box-shadow: 0 6px 14px rgba(0,0,0,0.08);
          mix-blend-mode: normal;
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255,255,255,0.5);
          transform-origin: center;
          animation-name: bubble-float;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        /* Typewriter text animations */
        @keyframes char-appear {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
            filter: blur(4px);
          }
          50% {
            transform: translateY(-2px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes cursor-blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .typewriter-char {
          animation: char-appear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .typewriter-text {
          display: inline;
          line-height: 1.8;
        }

        .animate-cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }

        /* New header animations */
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }

        @keyframes gradient-shift-reverse {
          0%, 100% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.8) rotate(180deg);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes expand {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 3rem;
            opacity: 1;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease infinite;
        }

        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 4s ease infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BirthdayLetter;
