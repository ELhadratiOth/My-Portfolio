/* eslint-disable react/prop-types */
export default function Paragraphe({partie}) {
          if (partie == 0)
                    return (
                              <div>
     
                              </div>
                    );
          else if (partie == 1)
                    return (
                              <div> </div>);
          else
                    return (
                      <div className="flex items-center md:justify-center text-center md:text-left font-customFont w-5/6 md:w-1/3 md:-ml-32 lg:-ml-64 lg:1/3 md:mr-72  text-1xl">
                        <p className="flex-1 text-center md:text-left">
                          I&apos;m currently a first-year engineering student
                          specializing in Data Engineering at the National
                          School of Applied Sciences in Al Hoceima (ENSAH).
                        </p>
                      </div>
                    );
          
}
