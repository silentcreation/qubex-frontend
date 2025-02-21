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
      {open && (
        <div className="mt-2 text-gray-700 whitespace-pre-line">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const t = useT();

  const faqs: FAQItem[] = [
    { question: t('faq.questions.question1'), answer: t('faq.questions.answer1') },
    { question: t('faq.questions.question2'), answer: t('faq.questions.answer2') },
    { question: t('faq.questions.question3'), answer: t('faq.questions.answer3') },
    { question: t('faq.questions.question4'), answer: t('faq.questions.answer4') },
    { question: t('faq.questions.question5'), answer: t('faq.questions.answer5') },
    { question: t('faq.questions.question6'), answer: t('faq.questions.answer6') },
    { question: t('faq.questions.question7'), answer: t('faq.questions.answer7') },
    { question: t('faq.questions.question8'), answer: t('faq.questions.answer8') },
    { question: t('faq.questions.question9'), answer: t('faq.questions.answer9') },
    { question: t('faq.questions.question10'), answer: t('faq.questions.answer10') },
    { question: t('faq.questions.question11'), answer: t('faq.questions.answer11') },
    { question: t('faq.questions.question12'), answer: t('faq.questions.answer12') },
    { question: t('faq.questions.question13'), answer: t('faq.questions.answer13') },
    { question: t('faq.questions.question14'), answer: t('faq.questions.answer14') },
    { question: t('faq.questions.question15'), answer: t('faq.questions.answer15') }
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
