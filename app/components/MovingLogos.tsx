const MovingLogos = () => {
  const logos = [
    "/waffletime.jpg",
    "/zafenity.jpg",
    "/ghuddy.jpg",
    "/namimoon.jpg",
    "/kudos.jpg",
    "/masalaking.jpg",
    "/bridgepoint.jpg",
  ];

  return (
    <div className="relative w-full overflow-hidden py-8 bg-transparent">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="w-28 h-28 mx-6 inline-flex items-center justify-center flex-shrink-0"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border border-flow-border bg-flow-card shadow-xl transform hover:scale-110 transition-all duration-300">
              <img
                src={logo}
                alt={`Company logo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 15s;
          }
        }
      `}</style>
    </div>
  );
};

export default MovingLogos;
