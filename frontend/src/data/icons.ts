import { JsonIcon } from 'components/Icon';

const iconSet = {
  prediction: {
    viewBox: '0 0 32 32',
    paths: [
      {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d:
          'M22.7358 22.6667H25.3333C26.3942 22.6667 27.4116 22.2452 28.1618 21.4951C28.9119 20.7449 29.3333 19.7275 29.3333 18.6667C29.3333 17.6058 28.9119 16.5884 28.1618 15.8382C27.4116 15.0881 26.3942 14.6667 25.3333 14.6667H23.3333V14C23.3333 12.0551 22.5607 10.1898 21.1855 8.81455C19.8102 7.43928 17.9449 6.66667 16 6.66667C12.6667 6.66667 9.82667 8.92 8.94667 12H8C6.58551 12 5.22896 12.5619 4.22876 13.5621C3.22857 14.5623 2.66667 15.9188 2.66667 17.3333C2.66667 18.7478 3.22857 20.1044 4.22876 21.1046C5.22896 22.1048 6.58551 22.6667 8 22.6667H9.26425L7.72733 25.3287C5.70459 25.2598 3.77905 24.4261 2.34315 22.9902C0.842855 21.4899 0 19.4551 0 17.3333C0 13.2 3.12 9.81333 7.13333 9.37333C8.8 6.18667 12.1467 4 16 4C20.8533 4 24.8933 7.45333 25.8 12.04C29.2667 12.2933 32 15.1467 32 18.6667C32 19.5421 31.8276 20.4091 31.4925 21.2179C31.1575 22.0267 30.6664 22.7617 30.0474 23.3807C29.4283 23.9998 28.6934 24.4908 27.8846 24.8259C27.0757 25.1609 26.2088 25.3333 25.3333 25.3333H24.2754L22.7358 22.6667Z',
      },
      'M22.0725 28.04L16.385 17.1025C16.3475 17.033 16.2919 16.975 16.2242 16.9346C16.1564 16.8942 16.0789 16.8728 16 16.8728C15.9211 16.8728 15.8436 16.8942 15.7759 16.9346C15.7081 16.975 15.6525 17.033 15.615 17.1025L9.92751 28.04C9.88911 28.1065 9.8689 28.182 9.8689 28.2588C9.8689 28.3355 9.88911 28.411 9.92751 28.4775C9.96753 28.5433 10.0242 28.5974 10.0918 28.6342C10.1594 28.6711 10.2355 28.6895 10.3125 28.6875H21.6875C21.7634 28.6875 21.8381 28.6677 21.904 28.6301C21.97 28.5925 22.025 28.5384 22.0638 28.4731C22.1027 28.4079 22.124 28.3337 22.1255 28.2577C22.127 28.1818 22.1088 28.1067 22.0725 28.04ZM15.51 20.375H16.4944V24.75H15.51V20.375ZM16 27.375C15.8702 27.375 15.7433 27.3365 15.6354 27.2644C15.5275 27.1923 15.4434 27.0898 15.3937 26.9699C15.344 26.85 15.331 26.718 15.3564 26.5907C15.3817 26.4634 15.4442 26.3465 15.536 26.2547C15.6277 26.1629 15.7447 26.1004 15.872 26.0751C15.9993 26.0498 16.1312 26.0628 16.2511 26.1125C16.3711 26.1621 16.4736 26.2462 16.5457 26.3542C16.6178 26.4621 16.6563 26.589 16.6563 26.7188C16.6563 26.8928 16.5871 27.0597 16.464 27.1828C16.341 27.3059 16.1741 27.375 16 27.375Z',
    ],
  },
  equipments: {
    viewBox: '0 0 32 32',
    paths: [
      'M8 4V8H4V4H8ZM2 2V10H10V2H2ZM18 7V11H14V7H18ZM12 5V13H20V5H12ZM8 16V20H4V16H8ZM2 14V22H10V14H2Z',
      'M22 10V16H16V22H10V30H30V10H22ZM18 18H22V22H18V18ZM16 28H12V24H16V28ZM22 28H18V24H22V28ZM28 28H24V24H28V28ZM28 22H24V18H28V22ZM24 16V12H28V16H24Z',
    ],
  },
  'error-outline': {
    viewBox: '0 0 32 32',
    paths: [
      'M14.6667 20H17.3334V22.6667H14.6667V20ZM14.6667 9.33333H17.3334V17.3333H14.6667V9.33333ZM16 2.66666C8.62669 2.66666 2.66669 8.66666 2.66669 16C2.66669 19.5362 4.07144 22.9276 6.57193 25.4281C7.81004 26.6662 9.2799 27.6483 10.8976 28.3184C12.5152 28.9885 14.2491 29.3333 16 29.3333C19.5362 29.3333 22.9276 27.9286 25.4281 25.4281C27.9286 22.9276 29.3334 19.5362 29.3334 16C29.3334 14.249 28.9885 12.5152 28.3184 10.8976C27.6484 9.27988 26.6662 7.81002 25.4281 6.57191C24.19 5.33379 22.7201 4.35167 21.1025 3.6816C19.4848 3.01154 17.751 2.66666 16 2.66666ZM16 26.6667C13.171 26.6667 10.4579 25.5429 8.45755 23.5425C6.45716 21.5421 5.33335 18.829 5.33335 16C5.33335 13.171 6.45716 10.4579 8.45755 8.45753C10.4579 6.45714 13.171 5.33333 16 5.33333C18.829 5.33333 21.5421 6.45714 23.5425 8.45753C25.5429 10.4579 26.6667 13.171 26.6667 16C26.6667 18.829 25.5429 21.5421 23.5425 23.5425C21.5421 25.5429 18.829 26.6667 16 26.6667Z',
    ],
  },
  logout: {
    viewBox: '0 0 32 32',
    paths: [
      'M6 30H18C18.5303 29.9995 19.0387 29.7886 19.4136 29.4136C19.7886 29.0387 19.9995 28.5303 20 28V25H18V28H6V4H18V7H20V4C19.9995 3.46973 19.7886 2.96133 19.4136 2.58637C19.0387 2.21141 18.5303 2.00053 18 2H6C5.46973 2.00053 4.96133 2.21141 4.58637 2.58637C4.21141 2.96133 4.00053 3.46973 4 4V28C4.00053 28.5303 4.21141 29.0387 4.58637 29.4136C4.96133 29.7886 5.46973 29.9995 6 30Z',
      'M20.586 20.586L24.172 17H10V15H24.172L20.586 11.414L22 10L28 16L22 22L20.586 20.586Z',
    ],
  },
  map: {
    viewBox: '0 0 32 32',
    paths: [
      'M16 24L9.90997 15.4C8.91315 14.2231 8.27121 12.7872 8.05892 11.2595C7.84664 9.73183 8.07273 8.17529 8.71088 6.77115C9.34902 5.36702 10.373 4.17308 11.6634 3.32839C12.9539 2.4837 14.4578 2.02302 16 2C18.1377 2.02113 20.18 2.88859 21.6794 4.41241C23.1789 5.93623 24.0133 7.99219 24 10.13C24.0008 11.9949 23.3659 13.8044 22.2 15.26L16 24ZM16 4C14.3918 4.01847 12.8567 4.67438 11.7318 5.82371C10.6068 6.97303 9.98397 8.52183 9.99997 10.13C10.0067 11.5978 10.5348 13.0155 11.49 14.13L16 20.52L20.63 14C21.5101 12.9014 21.9929 11.5376 22 10.13C22.016 8.52183 21.3931 6.97303 20.2682 5.82371C19.1432 4.67438 17.6081 4.01847 16 4Z',
      'M16 11C17.1046 11 18 10.1046 18 9 18 7.89543 17.1046 7 16 7 14.8954 7 14 7.89543 14 9 14 10.1046 14.8954 11 16 11zM28 12H26V14H28V28H4V14H6V12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858 2.21071 12.9609 2 13.4696 2 14V28C2 28.5304 2.21071 29.0391 2.58579 29.4142 2.96086 29.7893 3.46957 30 4 30H28C28.5304 30 29.0391 29.7893 29.4142 29.4142 29.7893 29.0391 30 28.5304 30 28V14C30 13.4696 29.7893 12.9609 29.4142 12.5858 29.0391 12.2107 28.5304 12 28 12z',
    ],
  },
  list: {
    viewBox: '0 0 32 32',
    paths: [
      'M10 6H28V8H10V6ZM10 24H28V26H10V24ZM10 15H28V17H10V15ZM4 15H6V17H4V15ZM4 6H6V8H4V6ZM4 24H6V26H4V24Z',
    ],
  },
  'arrow-down': {
    viewBox: '0 0 32 32',
    paths: ['M16 22L6 12L7.4 10.6L16 19.2L24.6 10.6L26 12L16 22Z'],
  },
  error: {
    viewBox: '0 0 32 32',
    paths: [
      'M17.3334 17.3333H14.6667V9.33333H17.3334V17.3333ZM17.3334 22.6667H14.6667V20H17.3334V22.6667ZM16 2.66667C14.2491 2.66667 12.5152 3.01154 10.8976 3.68161C9.2799 4.35167 7.81004 5.3338 6.57193 6.57191C4.07144 9.0724 2.66669 12.4638 2.66669 16C2.66669 19.5362 4.07144 22.9276 6.57193 25.4281C7.81004 26.6662 9.2799 27.6483 10.8976 28.3184C12.5152 28.9885 14.2491 29.3333 16 29.3333C19.5362 29.3333 22.9276 27.9286 25.4281 25.4281C27.9286 22.9276 29.3334 19.5362 29.3334 16C29.3334 14.249 28.9885 12.5152 28.3184 10.8976C27.6484 9.27988 26.6662 7.81003 25.4281 6.57191C24.19 5.3338 22.7201 4.35167 21.1025 3.68161C19.4848 3.01154 17.751 2.66667 16 2.66667Z',
    ],
  },
  close: {
    viewBox: '0 0 32 32',
    paths: [
      'M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4L14.6 16L8 22.6L9.4 24L16 17.4L22.6 24L24 22.6L17.4 16L24 9.4Z',
    ],
  },
  warn: {
    viewBox: '0 0 32 32',
    paths: [
      'M17.0909 15.2632H14.9091V10.8421H17.0909V15.2632ZM17.0909 19.6842H14.9091V17.4737H17.0909V19.6842ZM4 23H28L16 2L4 23Z',
    ],
  },
};

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testIconTypes: {
    [k: string]: JsonIcon;
  } = iconSet;
}

export default iconSet;