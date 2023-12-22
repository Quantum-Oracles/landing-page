import React, { useState } from "react";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    title: "What is Quantum Oracles?",
    content: (
      <p>
        Quantum Oracles is a cutting-edge platform that leverages blockchain
        technology to store and retrieve results from quantum computations. It's
        designed to facilitate decentralized quantum computing and provide users
        with a trustless environment for accessing quantum computational power.
      </p>
    ),
  },
  {
    title: "How does Quantum Oracles work?",
    content: (
      <p>
        Quantum Oracles works by executing quantum circuits on quantum computers
        and then storing the results on a blockchain. When a user submits a
        quantum circuit, the smart contract emits an event, the quantum oracle
        fetches the event, executes the circuit, and stores the result on the
        blockchain. Now next time if the same circuit appears, then the result
        will be fetched directly from the blockchain. This process ensures that
        the computation is only done once and the result can be efficiently
        retrieved by anyone who needs it, saving a lot of resources in the
        process.
      </p>
    ),
  },
  {
    title: "What are the advantages?",
    content: (
      <p>
        The main advantages of Quantum Oracles include:
        <br />
        <br />- <b>Efficiency:</b> Eliminates the need for redundant
        computations by storing results for easy retrieval. <br />
        <br />-<b>Decentralization:</b> Reduces reliance on a single quantum
        processor by distributing computations across multiple systems. <br />
        <br />-<b>Trustlessness:</b> Provides a secure and transparent system
        where users can verify the correctness of computation results without
        trusting a central authority. <br />
        <br />- <b>Accessibility:</b> Integrates with cryptocurrency systems to
        allow users to pay for quantum computing services with digital assets.
      </p>
    ),
  },
  {
    title: "Who can benefit from Quantum Oracles?",
    content: (
      <p>
        Researchers, developers, businesses, and anyone interested in quantum
        computing can benefit from Quantum Oracles. It's particularly useful for
        those who require quantum computational power but do not have direct
        access to quantum computers.
      </p>
    ),
  },
  {
    title: "Can it be used for financial applications?",
    content: (
      <p>
        Yes, one of the key applications we're developing is a quantum hedge
        fund that uses quantum algorithms to inform its investment strategies.
        The platform will allow users to invest in a vault contract, receive
        shares, and benefit from the fund's performance.
      </p>
    ),
  },
  {
    title: "Is there a token?",
    content: (
      <p>
        While Quantum Oracles integrates with existing cryptocurrency payment
        systems, we have not announced a dedicated token.
      </p>
    ),
  },
  {
    title: "How can I get involved?",
    content: (
      <p>
        There are multiple ways to get involved:
        <br />
        <br />- <b>As a user:</b> You can use the platform to submit quantum
        computation jobs.
        <br />
        <br />- <b>As a developer:</b> You can contribute to the codebase,
        propose features, or build on top of the Quantum Oracles platform.
        <br />
        <br />- <b>As an investor:</b> You can reach out to us at
        contact@quantumoracles.dev or directly through our contact form.
      </p>
    ),
  },
  {
    title: "Where can I learn more?",
    content: (
      <p>
        For more detailed information, please checkout our website, read our
        whitepaper, or reach out to us directly through our contact form. Follow
        us on social media for regular updates and announcements.
      </p>
    ),
  },
];

export default function Faqs() {
  return (
    <section
      id="faq"
      className="p-page relative mt-[20vh] flex mobile:mt-[15vh] mobile:flex-col"
    >
      <div className="top-[15vh] mt-2 mobile:mt-0 widescreen:sticky widescreen:pr-[10%]">
        <span className="text-bg-gradient bg-gradient-to-br from-accent to-secondary font-poppins text-sm tracking-[7px] opacity-60">
          FAQ
        </span>

        <h1 className="mt-6 font-raleway text-5xl font-semibold leading-none mobile:text-3xl">
          <span className="block font-light">Frequently</span>
          Asked Questions
        </h1>
      </div>

      <div className="flex flex-1 flex-col gap-y-6 mobile:mt-10">
        {faqs.map((faq, key) => (
          <Faq faq={faq} key={key} />
        ))}
      </div>

      <div
        className="absolute left-1/2 top-[45vh] -z-10 h-[30vh] w-[75vw] -translate-x-1/2 rotate-[20deg] rounded-full bg-gradient-to-l from-primary 
        to-secondary opacity-20 blur-[111px]"
      />
    </section>
  );
}

function Faq(props: { faq: { title: string; content: React.ReactNode } }) {
  const [open, setOpen] = useState(false);

  const { faq } = props;

  return (
    <div
      onClick={() => {
        if (open) setOpen(false);
      }}
      className=""
    >
      <div
        className="flex cursor-pointer items-center justify-between border border-front border-opacity-25 bg-foreground bg-opacity-10 px-8 py-6"
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <h4 className="text-2xl font-light mobile:text-xl">{faq.title}</h4>
        <button
          className="group relative flex aspect-square h-[1.3em] scale-200 items-center justify-center border border-front border-opacity-20 bg-foreground
        bg-opacity-10 text-3xl font-extralight duration-300"
        >
          <span
            className={twMerge(
              "duration-inherit",
              open && "-rotate-90 scale-150 opacity-0"
            )}
          >
            +
          </span>
          <span className="absolute-center scale-150">-</span>
        </button>
      </div>
      {open && (
        <div className="border border-front border-t-transparent border-opacity-30 px-8 py-6">
          {faq.content}
        </div>
      )}
    </div>
  );
}
