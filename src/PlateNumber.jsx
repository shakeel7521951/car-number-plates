import plateNumber from './assets/numberPlate.jpg';
const PlateNumber = ({ plateNo }) => {
  return (
    <section className='w-full h-full overflow-hidden'>
      <div className='relative'>
        <img src={plateNumber} alt='PlateNumber ' className='h-[150px] w-[100%] md:h-full md:w-full'/>
        <span className='absolute top-[50%] left-[50%] translate-x-[-25%]   text-4xl font-bold'>
          {plateNo}
        </span>
      </div>
    </section>
  );
};
export default PlateNumber;
