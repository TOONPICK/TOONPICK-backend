import React from 'react';
import { Author } from '@models/webtoon';
import styles from './style.module.css';

interface AuthorTextProps {
  authors: Author[];
  className?: string;
}

const AuthorText: React.FC<AuthorTextProps> = ({ authors, className }) => {
  const authorsByRole = authors.reduce((acc, author) => {
    if (!acc[author.role]) acc[author.role] = [];
    acc[author.role].push(author.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className={`${styles.authors} ${className || ''}`}>
      {Object.entries(authorsByRole)
        .map(([role, names]) => `${role} : ${names.join(', ')}`)
        .join(' | ')}
    </div>
  );
};

export default AuthorText; 