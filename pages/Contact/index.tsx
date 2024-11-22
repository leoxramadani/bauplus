import { useTheme } from '@/lib/contexts/ThemeContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
export default function Contact() {
  const { isDarkMode } = useTheme();

  return (
    <div className="mx-auto mt-[50px] flex h-auto flex-col items-center justify-around sm:flex-row">
      <div className="h-[200px] w-[320px] bg-white/40  py-2 sm:h-[300px] sm:px-6 lg:px-8">
        <div className="space-y-4 font-serif text-gray-600">
          <p>
            <LocationOnIcon className="pr-[5px] " />
            <i className="text-blue-400 underline">
              Kumanovë, Maqedoni e Veriut
            </i>
          </p>
          <p>
            <AddIcCallIcon className="pr-[5px] " />
            <i className="text-blue-400 underline">+389 70 848 844</i>
          </p>
          <p>
            <MarkEmailReadIcon className="pr-[5px]" />{' '}
            <a
              href="mailto:enisramadani@hotmail.com"
              className="italic text-blue-400 underline"
            >
              enisraamadani@hotmail.com
            </a>
          </p>
          <p>
            <AccessTimeIcon className="pr-[5px]" />
            <i className="text-blue-400 underline">
              E hënë - E premte, 09:00 - 17:00 PM
            </i>
          </p>
        </div>
      </div>
      <div className="ml-[10%] flex h-[300px] w-[80%] flex-col sm:ml-[0%] sm:w-[70%] ">
        <div className="flex-1  text-gray-600">
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
