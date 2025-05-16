import React from 'react';
import Link from 'next/link';

interface SignUpButtonProps {
  text: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ text }) => {
  return (
    <Link href="/courses">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Start Learning For Free
      </button>
    </Link>
  );
};

export default SignUpButton;
