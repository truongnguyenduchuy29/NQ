import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const BirthdayLetter = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
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

  const fullText = `Chúc mừng sinh nhật 18 tuổi lần thứ 4 của Như Quỳnh! 

Tuổi mới chúc em luôn vui vẻ, có nhiều sức khỏe, xinh đẹp. 

Đặc biệt mau giàu nha giờ cũng là phú bà rồi =)) 💰✨

Cám ơn em vì đã cho anh cơ hội được bước vào cuộc sống của em. 

Tuổi mới rực rỡ nhá! 🌟`;

  const handleEnvelopeClick = () => {
    if (isOpened) return;

    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 250 - 125,
      y: Math.random() * 250 - 125,
    }));

    setHearts(newHearts);
    setIsOpening(true);

    // Show paper flying out after hearts start bursting
    setTimeout(() => {
      setShowPaper(true);
    }, 1200);

    // Open the letter/card after paper settles
    setTimeout(() => {
      setIsOpened(true);
    }, 3000);

    // Clear hearts after they finish
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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.3),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(216,180,254,0.3),transparent_50%)] animate-pulse-slow-delayed"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating confetti - более изящные */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            <span
              className="text-3xl drop-shadow-lg"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
                filter: 'brightness(1.2)',
              }}
            >
              {['🎊', '🎉', '✨', '🌟', '💝'][Math.floor(Math.random() * 5)]}
            </span>
          </div>
        ))}

        {/* Corner decorations - subtler */}
        <div className="absolute top-8 left-8 text-5xl animate-float opacity-50 blur-[0.5px]">
          🎈
        </div>
        <div className="absolute top-16 right-12 text-4xl animate-float-delayed opacity-50 blur-[0.5px]">
          🎀
        </div>
        <div className="absolute bottom-16 left-16 text-4xl animate-float-slow opacity-50 blur-[0.5px]">
          🎂
        </div>
        <div className="absolute bottom-12 right-20 text-5xl animate-float opacity-50 blur-[0.5px]">
          �
        </div>
      </div>

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none animate-heart-burst z-20"
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

      <div className="relative z-10">
        {!isOpened ? (
          <div className="flex flex-col items-center gap-8">
            {/* Elegant frame around envelope */}
            <div className="absolute -inset-12 bg-gradient-to-br from-white/60 via-pink-50/50 to-purple-50/50 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-[0_8px_32px_rgba(255,182,193,0.3)] -z-10"></div>

            {/* Flying paper from envelope */}
            {showPaper && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-paper-fly z-30">
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8 w-80 transform animate-paper-unfold border-2 border-pink-200/50">
                  <div className="text-center">
                    <div className="text-5xl mb-3 animate-bounce">💌</div>
                    <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mb-3"></div>
                    <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      Đang mở thư...
                    </p>
                    <div className="flex justify-center gap-1 mt-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instruction text */}
            <div className="text-center relative mb-4">
              {/* Decorative sparkles */}
              <div className="absolute -left-16 top-0 text-2xl animate-twinkle">
                ✨
              </div>
              <div
                className="absolute -right-16 top-0 text-2xl animate-twinkle"
                style={{ animationDelay: '0.5s' }}
              >
                ✨
              </div>

              <div className="inline-block">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 mb-2 drop-shadow-sm">
                  Click để mở thư
                </p>
                <div className="h-1 w-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 rounded-full animate-shimmer"></div>
              </div>
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
                    Happy
                  </h1>
                  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 animate-gradient-shift-reverse drop-shadow-lg tracking-tight">
                    Birthday!
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
                  {displayedText.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="mb-4">
                      {line.split('').map((char, charIndex) => {
                        const globalIndex =
                          displayedText.substring(
                            0,
                            displayedText
                              .split('\n')
                              .slice(0, lineIndex)
                              .join('\n').length + (lineIndex > 0 ? 1 : 0)
                          ).length + charIndex;
                        return (
                          <span
                            key={`${lineIndex}-${charIndex}`}
                            className="typewriter-char"
                            style={{
                              animationDelay: `${globalIndex * 0.01}s`,
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                  {displayedText.length < fullText.length && (
                    <span className="inline-block w-[2px] h-6 bg-purple-500 animate-cursor-blink ml-[1px] -mt-1 align-text-bottom"></span>
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
          display: inline;
          animation: char-appear 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
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

        /* Background decorations animations */
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-8deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes twinkle-delayed {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.7);
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-twinkle-delayed {
          animation: twinkle-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Paper flying and unfolding animations */
        @keyframes paper-fly {
          0% {
            transform: translateY(100px) scale(0.3) rotate(0deg);
            opacity: 0;
          }
          30% {
            transform: translateY(-50px) scale(0.8) rotate(15deg);
            opacity: 1;
          }
          60% {
            transform: translateY(20px) scale(1.1) rotate(-10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes paper-unfold {
          0% {
            transform: scaleY(0.3) rotateX(90deg);
            opacity: 0;
          }
          50% {
            transform: scaleY(1) rotateX(-10deg);
          }
          100% {
            transform: scaleY(1) rotateX(0deg);
            opacity: 1;
          }
        }

        .animate-paper-fly {
          animation: paper-fly 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-paper-unfold {
          animation: paper-unfold 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
          transform-origin: center top;
        }

        /* New improved animations */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BirthdayLetter;
