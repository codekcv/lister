import React from 'react';

interface Props {}

export const About: React.FC<Props> = () => {
  return (
    <>
      <h1>About This App</h1>
      <p>This is a full stack React app for organizing notes.</p>
      <p>Version: 1.0.0</p>
      <a href="https://twitter.com/villamin_c">@villamin_c</a>
    </>
  );
};
