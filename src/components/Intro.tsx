const Intro = () => {
  return (
    <div className="bg-blue-500 py-16 text-white mb-16">
      {/* Hero section */}
      <div className="text-center mb-8 md:mb-0">
        <h1 className="text-4xl text-center md:text-6xl font-bold mb-6 leading-tight">
          ژێرنووسی ئنگلیزی لیرە بکە بە کوردی
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mt-6">
          بێ ماندووبوون ژێرنووسەکانت لە زمانێکەوە بۆ زمانێکی تر وەربگێڕە. ئێستا
          <span className="block pt-2"> دەست پێ بکە!</span>
        </p>
      </div>
    </div>
  );
};

export default Intro;
