"use client";
import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const ContactForm = () => {
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (form.current) {
      emailjs
        .sendForm(
          "service_b192w55",
          "template_v60stt4",
          form.current,
          "KWNpAnRUiLJsLY4ap"
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSubmitted(true);
            setIsLoading(false);
          },
          (error) => {
            console.log(error.text);
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <div className="h-full">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="h-full flex flex-col p-4 md:p-0 md:pt-4 md:pr-4 md:pl-4 w-full md:justify-between justify-center md:pb-5"
      >
        <div
          id="contactForm"
          className="flex flex-col w-full items-center justify-center "
        >
          <div
            id="formTopInputs"
            className="flex flex-wrap items-start justify-start align-start"
          >
            <div
              id="formEmail"
              className="flex flex-col w-full lg:w-56 md:mx-2  items-center align-start justify-center md:mb-4 mb-2"
            >
              <Input
                type="email"
                label="Votre email"
                isRequired
                radius="lg"
                id="email"
                name="email"
                color="primary"
                className=""
                errorMessage="Veuillez remplir ce champs"
              />
            </div>
          </div>
        </div>
        <div id="contactFormButton" className="md:mx-2 mt-6 ">
          <Button
            className="p-4 w-52 h-14"
            color="primary"
            size="lg"
            radius="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
          {isSubmitted && (
            <p className="text-green-500 mt-2">
              Votre message a bien été envoyé.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
