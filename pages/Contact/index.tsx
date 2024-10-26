import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
export default function Contact() {
  return (
    <div className="mx-auto flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center font-serif text-[22px] font-medium text-slate-600">
          Të dhënat tona
        </h2>
        <div className="space-y-4 font-serif text-gray-600">
          <p>
            <LocationOnIcon className="pr-[5px] " />
            <i className="underline">Addresa:</i> Kumanovë, Maqedoni e
            Veriut
          </p>
          <p>
            <AddIcCallIcon className="pr-[5px]" />
            <i className="underline">Numri:</i> +389 70 848 844
          </p>
          <p>
            <MarkEmailReadIcon className="pr-[5px]" />{' '}
            <i className="underline">Email:</i>
            <a href="mailto:enisramadani@hotmail.com">
              enisraamadani@hotmail.com
            </a>
          </p>
          <p>
            <AccessTimeIcon className="pr-[5px]" />
            <i className="underline">Orari:</i> E hënë - E premte,
            09:00 - 17:00 PM
          </p>
        </div>
      </div>
      <div className="flex h-screen flex-col">
        <div className="flex-1 px-[20px] text-gray-600">
          <p className="text-center font-serif text-[22px] font-medium text-slate-600">
            Lokacioni:{' '}
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2958.4426323879134!2d21.711128892755802!3d42.140813989077635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDA4JzI2LjkiTiAyMcKwNDInNDUuOCJF!5e0!3m2!1sen!2smk!4v1729804897463!5m2!1sen!2smk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
