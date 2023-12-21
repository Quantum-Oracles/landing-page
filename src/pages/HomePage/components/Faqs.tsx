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
        <a target="_blank" href="mailto:contact@quantumoracles.dev">
          contact@quantumoracles.dev
        </a>{" "}
        or directly through our contact form.
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
    <section id="faq" className="p-page flex mt-[20vh] relative">
      <div className="mt-2 pr-[10%] sticky top-[15vh]">
        <span className="tracking-[7px] text-sm text-bg-gradient bg-gradient-to-br from-accent to-secondary opacity-60 font-poppins">
          FAQ
        </span>

        <h1 className="font-semibold text-5xl leading-none mt-6 font-raleway">
          <span className="font-light block">Frequently</span>
          Asked Questions
        </h1>
      </div>

      <div className="flex-1 flex flex-col gap-y-6">
        {faqs.map((faq, key) => (
          <Faq faq={faq} key={key} />
        ))}
      </div>

      <div
        className="absolute top-[45vh] left-1/2 -translate-x-1/2 bg-gradient-to-l from-primary to-secondary opacity-20 h-[30vh] w-[75vw] rounded-full 
        rotate-[20deg] blur-[111px] -z-10"
      />
    </section>
  );
}

function Faq(props: { faq: { title: string; content: React.ReactNode } }) {
  const [open, setOpen] = useState(false);

  const { faq } = props;

  return (
    <div className="">
      <div
        className="flex justify-between items-center py-6 px-8 bg-foreground bg-opacity-10 border border-front border-opacity-25 cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <h4 className="font-light text-2xl">{faq.title}</h4>
        <button
          className="h-[1.3em] aspect-square text-3xl flex justify-center items-center bg-foreground bg-opacity-10 border border-front border-opacity-20 group
        font-extralight scale-200 duration-300 relative"
        >
          <span
            className={twMerge(
              "duration-inherit",
              open && "-rotate-90 opacity-0 scale-150"
            )}
          >
            +
          </span>
          <span className="absolute-center scale-150">-</span>
        </button>
      </div>
      {open && (
        <div className="py-6 px-8 border border-front border-opacity-30 border-t-transparent">
          {faq.content}
        </div>
      )}
    </div>
  );
}
