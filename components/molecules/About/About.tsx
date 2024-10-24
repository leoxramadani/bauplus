import Image from 'next/image';
import AboutUsPic from '../../../public/AboutUsPic.jpg';

function About() {
  return (
    <div className=" h-auto w-full sm:h-[85vh]">
      <div className="flex h-full w-full flex-col items-center justify-around">
        <div className="my-[20px] flex h-[30px] w-full justify-center text-[22px]">
          <h2>Rreth nesh</h2>
        </div>
        <div className="flex h-auto w-full flex-col sm:flex-row">
          <div className="flex h-auto w-[100%] flex-col pt-[5px] sm:w-[50%] sm:pt-[20px]">
            <h3 className="mb-[10px] px-[20px] text-justify sm:px-[100px]">
              <b>BAUplus</b> një kompani lider në sektorin e ndërtimit
              dhe renovimeve, e angazhuar për t&#39;u ofruar klientëve
              tanë zgjidhje inovative dhe cilësore për transformimin e
              hapësirave të tyre. E themeluar me pasion dhe
              përkushtim, ne jemi të specializuar në renovimin e
              shtëpive, izolimin e ambienteve dhe dekorimin e tyre,
              duke u ofruar klientëve tanë mundësinë për të krijuar
              hapësira që reflektojnë stilin dhe nevojat e tyre.
            </h3>

            <h3 className="mb-[10px] px-[20px] text-justify sm:px-[100px]">
              Izolimi i Shtëpive: Zgjidhje efektive për izolimin e
              shtëpive tuaja, duke kontribuar në ruajtjen e energjisë
              dhe komfortin e ambienteve, duke ulur kostot e ngrohjes
              dhe ftohjes.
            </h3>
            <h3 className="mb-[10px] px-[20px] text-justify sm:px-[100px]">
              Dekorimi i Ambientit: Stile dhe ide të ndryshme për
              dekorimin e brendshëm dhe të jashtëm, duke ju ndihmuar
              të krijoni një atmosferë të këndshme dhe funksionale
              sipas shijeve tuaja.
            </h3>
            <h3 className="mb-[10px] px-[20px] sm:px-[100px]">
              Skele për Objekte: Ofrimi i sistemeve të skelave të
              sigurta dhe të qëndrueshme për të lehtësuar procesin e
              renovimit, duke garantuar që çdo projekt të realizohet
              në mënyrë efikase dhe të sigurt.
            </h3>
          </div>
          <div className="mx-[5%] w-[90%] sm:w-auto">
            <Image src={AboutUsPic} alt="aboutUsPic" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
