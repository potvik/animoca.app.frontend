import * as React from 'react';

export const RateIcon = (props: any) => {
  const { rate, iconProps } = props;

  switch (rate) {
    case 'A':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            d="M9.298 8.084c.072.152.108.3.108.444a.852.852 0 01-.324.672 1.054 1.054 0 01-.72.276.925.925 0 01-.504-.144.972.972 0 01-.36-.432l-.54-1.212H3.07L2.518 8.9a.945.945 0 01-.372.432.925.925 0 01-.504.144c-.272 0-.52-.092-.744-.276a.852.852 0 01-.324-.672c0-.144.036-.292.108-.444L3.85 1.58a1.09 1.09 0 01.456-.492c.208-.12.436-.18.684-.18.24 0 .464.06.672.18.208.112.364.276.468.492l3.168 6.504zM3.814 6.032h2.4l-1.2-2.676-1.2 2.676z"
          ></path>
        </svg>
      );
    case 'B':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="10"
          fill="none"
          viewBox="0 0 8 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            d="M5.874 5.048c.496.152.876.408 1.14.768.264.352.396.788.396 1.308 0 .464-.124.872-.372 1.224-.24.344-.588.612-1.044.804-.448.192-.976.288-1.584.288H1.218c-.328 0-.58-.088-.756-.264C.286 9 .198 8.748.198 8.42V2c0-.328.088-.58.264-.756C.638 1.068.89.98 1.218.98H4.29c.888 0 1.592.2 2.112.6.528.392.792.924.792 1.596 0 .432-.116.816-.348 1.152a1.99 1.99 0 01-.972.72zm-3.528-.744h1.572c.416 0 .72-.064.912-.192.192-.128.288-.332.288-.612 0-.296-.096-.512-.288-.648-.192-.136-.496-.204-.912-.204H2.346v1.656zm1.788 3.468c.44 0 .752-.068.936-.204.192-.144.288-.376.288-.696 0-.32-.096-.548-.288-.684-.184-.144-.496-.216-.936-.216H2.346v1.8h1.788z"
          ></path>
        </svg>
      );

    case 'C':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="10"
          fill="none"
          viewBox="0 0 8 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            d="M4.606 9.548c-.848 0-1.592-.176-2.232-.528A3.683 3.683 0 01.898 7.508C.554 6.852.382 6.084.382 5.204c0-.872.172-1.636.516-2.292A3.683 3.683 0 012.374 1.4c.64-.352 1.384-.528 2.232-.528 1.016 0 1.908.268 2.676.804.136.096.232.2.288.312a.864.864 0 01.096.432c0 .248-.072.46-.216.636a.625.625 0 01-.504.252c-.12 0-.228-.016-.324-.048-.096-.04-.208-.1-.336-.18a3.404 3.404 0 00-.792-.36 2.74 2.74 0 00-.768-.108c-.712 0-1.244.216-1.596.648-.344.424-.516 1.072-.516 1.944 0 .88.172 1.536.516 1.968.352.424.884.636 1.596.636.24 0 .472-.036.696-.108.224-.08.512-.2.864-.36.168-.088.292-.148.372-.18a.775.775 0 01.288-.048c.2 0 .368.088.504.264A.925.925 0 017.666 8a.907.907 0 01-.096.432.871.871 0 01-.288.312c-.768.536-1.66.804-2.676.804z"
          ></path>
        </svg>
      );

    case 'D':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="10"
          fill="none"
          viewBox="0 0 9 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            d="M1.718 9.44c-.328 0-.58-.088-.756-.264C.786 9 .698 8.748.698 8.42V2c0-.328.088-.58.264-.756.176-.176.428-.264.756-.264h2.424c.936 0 1.74.172 2.412.516.68.336 1.2.82 1.56 1.452.36.632.54 1.384.54 2.256 0 .88-.18 1.64-.54 2.28a3.492 3.492 0 01-1.548 1.452c-.672.336-1.48.504-2.424.504H1.718zm2.268-1.776c.824 0 1.44-.2 1.848-.6.416-.408.624-1.028.624-1.86 0-.832-.208-1.448-.624-1.848-.408-.4-1.024-.6-1.848-.6h-1.08v4.908h1.08z"
          ></path>
        </svg>
      );

    case 'AA':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="10"
          fill="none"
          viewBox="0 0 15 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            d="M9.2 8.53a.86.86 0 01-.32.67 1.06 1.06 0 01-.73.28.89.89 0 01-.5-.15 1 1 0 01-.36-.43l-.54-1.21H2.86L2.31 8.9a.93.93 0 01-.37.43.9.9 0 01-.51.15c-.272 0-.535-.1-.74-.28a.84.84 0 01-.33-.67 1.1 1.1 0 01.11-.45l3.17-6.5a1.12 1.12 0 01.46-.5 1.43 1.43 0 011.35 0c.207.111.372.287.47.5l3.17 6.5a1.1 1.1 0 01.11.45zM3.6 6H6L4.8 3.36 3.6 6z"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M11.103 8.317a1 1 0 001.707-.707v-.97h.97a1 1 0 100-2h-.97v-.96a1 1 0 10-2 0v.96h-.96a1 1 0 100 2h.96v.97a1 1 0 00.293.707z"
            clipRule="evenodd"
          ></path>
        </svg>
      );

    default:
    case 'AAA':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="10"
          fill="none"
          viewBox="0 0 22 10"
          {...iconProps}
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M11.153 8.317a1 1 0 001.707-.707v-.97h.96a1 1 0 100-2h-.96v-.96a1 1 0 00-2 0v.96h-.97a1 1 0 100 2h.97v.97a1 1 0 00.293.707zM18.063 8.317a1 1 0 001.707-.707v-.97h.97a1 1 0 100-2h-.97v-.96a1 1 0 00-2 0v.96h-.96a1 1 0 000 2h.96v.97a1 1 0 00.293.707z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#fff"
            d="M9.24 8.53a.86.86 0 01-.32.67 1 1 0 01-.73.28.89.89 0 01-.5-.15 1 1 0 01-.36-.43l-.54-1.21H2.9L2.35 8.9a.93.93 0 01-.37.43.9.9 0 01-.51.15 1.08 1.08 0 01-.73-.28.84.84 0 01-.33-.67c0-.155.035-.309.1-.45l3.17-6.5c.1-.208.26-.382.46-.5a1.43 1.43 0 011.35 0c.207.111.372.287.47.5l3.17 6.5a1.1 1.1 0 01.11.45zM3.65 6h2.4l-1.2-2.67L3.65 6z"
          ></path>
        </svg>
      );
  }
};
