import NavBar from "./Components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebase";
import ContactCard from "./Components/ContactCard";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoContact from "./Components/NoContact";


const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        })

        // console.log(contactList);

      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);


  const filterContact = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));


      setContacts(filteredContacts);
      return filteredContacts;
    });
  }

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className=" flex relative items-center flex-grow">
            <FiSearch className=" ml-1 text-white text-3xl absolute" />
            <input
              onChange={filterContact}
              type="text"
              className=" bg-transparent border border-white rounded-md h-10 flex-grow text-white pl-11"
              placeholder="Search Contact"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-white cursor-pointer text-5xl"
          />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? <NoContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />


    </>
  );
};

export default App;
