import { ErrorMessage, Field, Form, Formik } from "formik";
import Model from "./Model";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup"

const contactValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact Added successfully");
        } catch (err) {
            console.log(err);
        }
    };
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact Updated successfully");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Model isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactValidation}
                    initialValues={
                        isUpdate
                            ? {
                                name: contact.name,
                                email: contact.email,
                            }
                            : {
                                name: "",
                                email: "",
                            }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contact.id) : addContact(values);
                    }}
                >
                    <Form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <Field name="name" className=" border h-10 rounded-lg pl-2" />
                            <div className=" text-red-500 text-xx">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <Field name="email" className=" border h-10 rounded-lg pl-2" />
                            <div className=" text-red-500 text-xx">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <button className="bg-orange px-3 py-1.5 border self-end ">
                            {isUpdate ? "Update" : "Add"} Contact
                        </button>
                    </Form>
                </Formik>
            </Model>
        </div>
    );
};

export default AddAndUpdateContact;
