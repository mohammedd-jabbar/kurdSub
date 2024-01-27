const Intro = () => {
  return (
    <div className="bg-blue-500 py-16 text-white mb-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="text-center mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            ژێرنووسی ئنگلیزی لیرە بکە بە کوردی
          </h1>

          <p className="text-lg md:text-xl leading-relaxed">
            Effortlessly translate your subtitles from one language to another.
            Get started now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
