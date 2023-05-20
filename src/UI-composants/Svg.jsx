import React from 'react';

function MySVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{ width: '100%', height: '100%', transform: 'translate3d(0,0,0)', contentVisibility: 'visible' }} viewBox="0 0 500 500">
      <defs>
        <clipPath id="g">
          <path d="M0 0h500v500H0z" />
        </clipPath>
        <clipPath id="l">
          <path d="M0 0h500v500H0z" />
        </clipPath>
        <clipPath id="j">
          <path d="M0 0h500v500H0z" />
        </clipPath>
        <clipPath id="h">
          <path d="M0 0h500v500H0z" />
        </clipPath>
        <filter id="a" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceGraphic">
            <feFuncA tableValues="1.0 0.0" type="table" />
          </feComponentTransfer>
        </filter>
        <filter id="c" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceGraphic">
            <feFuncA tableValues="1.0 0.0" type="table" />
          </feComponentTransfer>
        </filter>
        <filter id="e" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceGraphic">
            <feFuncA tableValues="1.0 0.0" type="table" />
          </feComponentTransfer>
        </filter>
        <mask id="m" maskType="alpha">
          <g filter="url(#a)">
            <path fill="#fff" d="M0 0h500v500H0z" opacity="0" />
            <use xlinkHref="#b" />
          </g>
        </mask>
        <mask id="k" maskType="alpha">
          <g filter="url(#c)">
            <path fill="#fff" d="M0 0h500v500H0z" opacity="0" />
            <use xlinkHref="#d" />
          </g>
        </mask>
        <mask id="i" maskType="alpha">
          <g filter="url(#e)">
            <path fill="#fff" d="M0 0h500v500H0z" opacity="0" />
            <use xlinkHref="#f" />
          </g>
        </mask>
      </defs>
      <g clipPath="url(#g)">
        <g clipPath="url(#h)" opacity="0" style={{ display: 'block' }}>
          <g className="primary design" mask="url(#i)" style={{ display: 'none' }}>
            <path />
            <path fill="none" />
          </g>
          <path fill="#121330" d="M0-10c-5.52 0-10 4.48-10 10s4.48 10 10 10S10 5.52 10 0 5.52-10 0-10zM4.71 2.11c-.2.2-.45.29-.71.29-.26 0-.51-.09-.71-.29L0-1.18l-3.29 3.29c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41l4-4c.39-.39 1.03-.39 1.42 0l4 4c.39.39.39 1.02 0 1.41z" className="primary design" opacity="1" style={{ display: 'block' }} transform="translate(250 250) scale(20.83)" />
          <path className="primary design" style={{ display: 'none' }} />
        </g>
        <g clipPath="url(#j)" style={{ display: 'block' }}>
          <g className="primary design" mask="url(#k)" style={{ display: 'none' }}>
            <path />
            <path fill="none" />
          </g>
          <path fill="#121330" d="M0-10c-5.52 0-10 4.48-10 10s4.48 10 10 10S10 5.52 10 0 5.52-10 0-10zM4.71 2.11c-.2.2-.45.29-.71.29-.26 0-.51-.09-.71-.29L0-1.18l-3.29 3.29c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41l4-4c.39-.39 1.03-.39 1.42 0l4 4c.39.39.39 1.02 0 1.41z" className="primary design" style={{ display: 'block' }} transform="translate(250 250) scale(20.83)" />
          <path className="primary design" style={{ display: 'none' }} />
        </g>
        <g clipPath="url(#l)" opacity="0" style={{ display: 'block' }}>
          <g className="primary design" mask="url(#m)" style={{ display: 'none' }}>
            <path fill="none" />
            <path />
          </g>
          <path className="primary design" style={{ display: 'none' }} />
        </g>
        <g className="com" style={{ display: 'none' }}>
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
          <path />
        </g>
      </g>
    </svg>
  );
}

export default MySVG;
