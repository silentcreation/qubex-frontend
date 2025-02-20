'use client';

import React, { useState } from 'react';
import { useT } from '@/hooks/useT';

interface FAQItem {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<{ faq: FAQItem }> = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-300 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold text-lg focus:outline-none"
      >
        {faq.question}
      </button>
      {open && <div className="mt-2 text-gray-700">{faq.answer}</div>}
    </div>
  );
};

const FAQ: React.FC = () => {
  const t = useT();

  const faqs: FAQItem[] = [
    {
      question: t('faq.questions.question1'),
      answer: t('faq.questions.answer1'),
    },
    {
      question: t('faq.questions.question2'),
      answer: t('faq.questions.answer2'),
    },
    {
      question: t('faq.questions.question3'),
      answer: t('faq.questions.answer3'),
    },
    {
      question: t('faq.questions.question4'),
      answer: t('faq.questions.answer4'),
    },
    {
      question: t('faq.questions.question5'),
      answer: t('faq.questions.answer5'),
    }
  ];

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">{t('faq.title')}</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
