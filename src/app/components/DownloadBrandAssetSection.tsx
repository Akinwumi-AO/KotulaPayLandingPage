import { motion } from 'motion/react';
import { Download } from 'lucide-react';

// Import the SVG content as strings
const lightLogoSvg = `<svg width="865" height="254" viewBox="0 0 865 254" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M809.212 225.18H787.001L807.958 179.505L770.701 102.663H794.166L819.242 157.832L842.707 102.663H864.739L809.212 225.18Z" fill="white"/>
<path d="M694.844 166.25C694.844 158.847 697.232 152.936 702.008 148.517C706.904 143.98 713.293 141.114 721.174 139.92L743.564 136.516C747.863 135.919 750.012 133.83 750.012 130.247C750.012 126.307 748.639 123.142 745.893 120.754C743.146 118.246 739.026 116.992 733.533 116.992C728.279 116.992 724.1 118.485 720.995 121.47C717.89 124.336 716.099 128.098 715.622 132.755L696.635 128.456C697.471 120.575 701.232 113.888 707.919 108.395C714.607 102.782 723.085 99.9761 733.354 99.9761C746.012 99.9761 755.326 103.021 761.297 109.111C767.387 115.201 770.432 123.023 770.432 132.576V175.923C770.432 181.654 770.79 186.311 771.507 189.894H752.162C751.565 188.103 751.266 184.401 751.266 178.788C745.534 187.983 736.578 192.581 724.398 192.581C715.562 192.581 708.397 190.013 702.904 184.878C697.531 179.624 694.844 173.415 694.844 166.25ZM728.339 176.281C734.787 176.281 739.982 174.549 743.922 171.086C747.982 167.504 750.012 161.712 750.012 153.712V149.771L727.264 153.174C719.502 154.488 715.622 158.429 715.622 164.996C715.622 168.101 716.756 170.788 719.025 173.057C721.294 175.206 724.398 176.281 728.339 176.281Z" fill="white"/>
<path d="M623.462 223.927H602.863V102.663H622.925V114.485C625.193 110.544 628.776 107.261 633.672 104.633C638.568 102.006 644.24 100.693 650.688 100.693C663.226 100.693 673.078 104.992 680.243 113.589C687.407 122.068 690.99 132.934 690.99 146.189C690.99 159.444 687.228 170.43 679.705 179.147C672.182 187.745 662.271 192.044 649.972 192.044C644.001 192.044 638.687 190.909 634.03 188.64C629.373 186.371 625.85 183.506 623.462 180.043V223.927ZM670.212 146.189C670.212 138.069 668.063 131.561 663.764 126.665C659.465 121.65 653.793 119.142 646.747 119.142C639.822 119.142 634.149 121.65 629.731 126.665C625.432 131.561 623.283 138.069 623.283 146.189C623.283 154.429 625.432 161.056 629.731 166.071C634.149 171.087 639.822 173.594 646.747 173.594C653.673 173.594 659.286 171.087 663.585 166.071C668.003 161.056 670.212 154.429 670.212 146.189Z" fill="white"/>
<path d="M512.904 166.25C512.904 158.847 515.293 152.936 520.069 148.517C524.965 143.98 531.354 141.114 539.235 139.92L561.625 136.516C565.923 135.919 568.073 133.83 568.073 130.247C568.073 126.307 566.7 123.142 563.953 120.754C561.207 118.246 557.087 116.992 551.594 116.992C546.34 116.992 542.16 118.485 539.056 121.47C535.951 124.336 534.16 128.098 533.682 132.755L514.695 128.456C515.531 120.575 519.293 113.888 525.98 108.395C532.667 102.782 541.145 99.9761 551.415 99.9761C564.073 99.9761 573.387 103.021 579.357 109.111C585.447 115.201 588.492 123.023 588.492 132.576V175.923C588.492 181.654 588.851 186.311 589.567 189.894H570.222C569.625 188.103 569.327 184.401 569.327 178.788C563.595 187.983 554.639 192.581 542.459 192.581C533.622 192.581 526.458 190.013 520.965 184.878C515.591 179.624 512.904 173.415 512.904 166.25ZM546.4 176.281C552.848 176.281 558.042 174.549 561.983 171.086C566.043 167.504 568.073 161.712 568.073 153.712V149.771L545.325 153.174C537.563 154.488 533.682 158.429 533.682 164.996C533.682 168.101 534.817 170.788 537.085 173.057C539.354 175.206 542.459 176.281 546.4 176.281Z" fill="white"/>
<path d="M502.575 189.894H481.797V60.2119H502.575V189.894Z" fill="white"/>
<path d="M445.946 180.222C443.916 184.043 440.572 187.028 435.915 189.178C431.378 191.327 426.482 192.402 421.227 192.402C411.077 192.402 403.017 189.118 397.046 182.55C391.195 175.982 388.27 167.683 388.27 157.653V102.663H409.047V153.891C409.047 159.742 410.48 164.519 413.346 168.221C416.212 171.922 420.63 173.773 426.601 173.773C432.452 173.773 436.93 171.982 440.035 168.4C443.259 164.817 444.871 160.101 444.871 154.249V102.663H465.649V173.952C465.649 179.207 465.947 184.52 466.545 189.894H446.662C446.185 187.267 445.946 184.043 445.946 180.222Z" fill="white"/>
<path d="M360.298 75.9741V102.663H378.389V121.112H360.298V161.593C360.298 165.414 361.193 168.22 362.984 170.012C364.775 171.683 367.582 172.519 371.403 172.519C373.791 172.519 376.179 172.28 378.568 171.803V188.998C375.463 190.312 371.224 190.968 365.85 190.968C357.73 190.968 351.342 188.7 346.684 184.162C342.027 179.505 339.699 173.116 339.699 164.996V121.112H323.578V102.663H328.056C332.474 102.663 335.818 101.409 338.087 98.9014C340.356 96.3937 341.49 93.1098 341.49 89.0498V75.9741H360.298Z" fill="white"/>
<path d="M262.469 166.608C267.245 171.504 273.037 173.952 279.843 173.952C286.65 173.952 292.381 171.504 297.038 166.608C301.815 161.712 304.203 154.906 304.203 146.189C304.203 137.591 301.815 130.904 297.038 126.127C292.381 121.232 286.65 118.784 279.843 118.784C273.037 118.784 267.245 121.232 262.469 126.127C257.811 130.904 255.483 137.591 255.483 146.189C255.483 154.786 257.811 161.593 262.469 166.608ZM279.843 99.9761C292.978 99.9761 303.785 104.335 312.264 113.052C320.861 121.769 325.16 132.815 325.16 146.189C325.16 159.563 320.861 170.668 312.264 179.505C303.785 188.222 292.978 192.581 279.843 192.581C266.827 192.581 256.02 188.222 247.423 179.505C238.944 170.668 234.705 159.563 234.705 146.189C234.705 132.815 238.944 121.769 247.423 113.052C256.02 104.335 266.827 99.9761 279.843 99.9761Z" fill="white"/>
<path d="M216.169 189.894L176.583 134.904L159.746 153.354V189.894H138.252V62.8984H159.746V123.799L214.378 62.8984H242.678L191.271 118.963L243.216 189.894H216.169Z" fill="white"/>
<path d="M0 100.382C0 90.7404 7.8161 82.9243 17.4577 82.9243H26.1866V152.755C26.1866 162.397 18.3705 170.213 8.72888 170.213H0V100.382Z" fill="#B8F580"/>
<path d="M37.0918 65.4573C37.0918 55.8156 44.9079 47.9995 54.5495 47.9995H63.2784V189.844C63.2784 199.485 55.4623 207.301 45.8207 207.301H37.0918V65.4573Z" fill="#B8F580"/>
<path d="M74.1934 17.4578C74.1934 7.81611 82.0095 0 91.6511 0H102.562V235.68C102.562 245.321 94.7461 253.137 85.1045 253.137H74.1934V17.4578Z" fill="#B8F580"/>
</svg>`;

const darkLogoSvg = `<svg width="867" height="254" viewBox="0 0 867 254" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M810.485 225.334H788.239L809.229 179.587L771.914 102.625H795.415L820.531 157.88L844.033 102.625H866.099L810.485 225.334Z" fill="#001C27"/>
<path d="M695.938 166.311C695.938 158.896 698.329 152.976 703.113 148.551C708.017 144.006 714.416 141.136 722.309 139.94L744.734 136.531C749.04 135.933 751.193 133.84 751.193 130.252C751.193 126.305 749.817 123.136 747.066 120.744C744.316 118.232 740.189 116.977 734.688 116.977C729.425 116.977 725.239 118.472 722.13 121.462C719.02 124.332 717.226 128.099 716.748 132.764L697.732 128.458C698.569 120.565 702.336 113.867 709.034 108.365C715.731 102.744 724.223 99.9336 734.508 99.9336C747.186 99.9336 756.515 102.983 762.495 109.083C768.594 115.183 771.644 123.016 771.644 132.584V175.999C771.644 181.74 772.003 186.404 772.721 189.992H753.345C752.747 188.198 752.448 184.491 752.448 178.869C746.708 188.079 737.738 192.683 725.538 192.683C716.688 192.683 709.512 190.112 704.01 184.969C698.629 179.707 695.938 173.487 695.938 166.311ZM729.485 176.358C735.944 176.358 741.146 174.624 745.093 171.155C749.159 167.567 751.193 161.767 751.193 153.753V149.807L728.409 153.215C720.635 154.531 716.748 158.478 716.748 165.056C716.748 168.165 717.884 170.856 720.156 173.129C722.429 175.281 725.538 176.358 729.485 176.358Z" fill="#001C27"/>
<path d="M624.443 224.078H603.812V102.625H623.905V114.465C626.178 110.518 629.766 107.229 634.669 104.598C639.573 101.967 645.254 100.651 651.712 100.651C664.27 100.651 674.137 104.957 681.313 113.568C688.489 122.06 692.077 132.943 692.077 146.219C692.077 159.494 688.31 170.498 680.775 179.228C673.24 187.84 663.313 192.145 650.995 192.145C645.015 192.145 639.692 191.009 635.028 188.737C630.364 186.464 626.835 183.594 624.443 180.125V224.078ZM671.267 146.219C671.267 138.086 669.114 131.568 664.808 126.664C660.503 121.641 654.822 119.13 647.765 119.13C640.829 119.13 635.148 121.641 630.722 126.664C626.417 131.568 624.264 138.086 624.264 146.219C624.264 154.471 626.417 161.109 630.722 166.132C635.148 171.155 640.829 173.667 647.765 173.667C654.702 173.667 660.323 171.155 664.629 166.132C669.054 161.109 671.267 154.471 671.267 146.219Z" fill="#001C27"/>
<path d="M513.713 166.311C513.713 158.896 516.105 152.976 520.889 148.551C525.792 144.006 532.191 141.136 540.085 139.94L562.51 136.531C566.815 135.933 568.968 133.84 568.968 130.252C568.968 126.305 567.593 123.136 564.842 120.744C562.091 118.232 557.965 116.977 552.463 116.977C547.201 116.977 543.015 118.472 539.905 121.462C536.796 124.332 535.002 128.099 534.523 132.764L515.507 128.458C516.344 120.565 520.111 113.867 526.809 108.365C533.507 102.744 541.998 99.9336 552.284 99.9336C564.961 99.9336 574.29 102.983 580.27 109.083C586.37 115.183 589.42 123.016 589.42 132.584V175.999C589.42 181.74 589.778 186.404 590.496 189.992H571.121C570.523 188.198 570.224 184.491 570.224 178.869C564.483 188.079 555.513 192.683 543.314 192.683C534.463 192.683 527.287 190.112 521.786 184.969C516.404 179.707 513.713 173.487 513.713 166.311ZM547.261 176.358C553.719 176.358 558.922 174.624 562.868 171.155C566.935 167.567 568.968 161.767 568.968 153.753V149.807L546.184 153.215C538.41 154.531 534.523 158.478 534.523 165.056C534.523 168.165 535.659 170.856 537.932 173.129C540.204 175.281 543.314 176.358 547.261 176.358Z" fill="#001C27"/>
<path d="M503.366 189.992H482.556V60.1069H503.366V189.992Z" fill="#001C27"/>
<path d="M446.649 180.305C444.616 184.132 441.267 187.122 436.603 189.275C432.058 191.428 427.155 192.504 421.892 192.504C411.726 192.504 403.653 189.215 397.673 182.637C391.813 176.059 388.883 167.747 388.883 157.701V102.625H409.693V153.933C409.693 159.794 411.128 164.578 413.999 168.285C416.869 171.993 421.294 173.847 427.274 173.847C433.135 173.847 437.62 172.053 440.729 168.465C443.958 164.877 445.573 160.152 445.573 154.292V102.625H466.383V174.026C466.383 179.288 466.682 184.611 467.28 189.993H447.367C446.889 187.361 446.649 184.132 446.649 180.305Z" fill="#001C27"/>
<path d="M360.867 75.894V102.625H378.986V121.103H360.867V161.647C360.867 165.474 361.764 168.285 363.558 170.079C365.352 171.753 368.162 172.59 371.99 172.59C374.382 172.59 376.774 172.351 379.166 171.873V189.095C376.056 190.411 371.81 191.069 366.428 191.069C358.295 191.069 351.897 188.796 347.232 184.251C342.568 179.587 340.236 173.188 340.236 165.056V121.103H324.09V102.625H328.575C333 102.625 336.349 101.369 338.621 98.8572C340.894 96.3456 342.03 93.0566 342.03 88.9902V75.894H360.867Z" fill="#001C27"/>
<path d="M262.884 166.67C267.668 171.574 273.469 174.026 280.286 174.026C287.103 174.026 292.844 171.574 297.508 166.67C302.292 161.767 304.684 154.949 304.684 146.219C304.684 137.608 302.292 130.91 297.508 126.126C292.844 121.222 287.103 118.771 280.286 118.771C273.469 118.771 267.668 121.222 262.884 126.126C258.22 130.91 255.887 137.608 255.887 146.219C255.887 154.83 258.22 161.647 262.884 166.67ZM280.286 99.9336C293.442 99.9336 304.266 104.299 312.757 113.03C321.368 121.761 325.674 132.824 325.674 146.219C325.674 159.614 321.368 170.737 312.757 179.587C304.266 188.318 293.442 192.683 280.286 192.683C267.249 192.683 256.426 188.318 247.815 179.587C239.323 170.737 235.077 159.614 235.077 146.219C235.077 132.824 239.323 121.761 247.815 113.03C256.426 104.299 267.249 99.9336 280.286 99.9336Z" fill="#001C27"/>
<path d="M216.512 189.992L176.865 134.917L160.002 153.395V189.992H138.474V62.7979H160.002V123.794L214.718 62.7979H243.064L191.576 118.95L243.602 189.992H216.512Z" fill="#001C27"/>
<path d="M0 100.539C0 90.8825 7.82835 83.0542 17.4851 83.0542H26.2276V152.995C26.2276 162.651 18.3993 170.48 8.74254 170.48H0V100.539Z" fill="#99D261"/>
<path d="M37.1543 65.5603C37.1543 55.9036 44.9826 48.0752 54.6394 48.0752H63.3819V190.142C63.3819 199.798 55.5536 207.627 45.8968 207.627H37.1543V65.5603Z" fill="#99D261"/>
<path d="M74.3105 17.4851C74.3105 7.82835 82.1389 0 91.7956 0H102.724V236.049C102.724 245.706 94.8955 253.534 85.2387 253.534H74.3105V17.4851Z" fill="#99D261"/>
</svg>`;

// Logo Mark SVGs
const logoMarkGreenSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M61.5 80.8449C61.5 73.6081 67.3666 67.7415 74.6034 67.7415H81.1552V120.155C81.1552 127.392 75.2886 133.259 68.0517 133.259H61.5V80.8449Z" fill="#B8F580"/>
<path d="M89.3457 54.6303C89.3457 47.3935 95.2123 41.5269 102.449 41.5269H109.001V147.992C109.001 155.229 103.134 161.096 95.8974 161.096H89.3457V54.6303Z" fill="#B8F580"/>
<path d="M117.189 18.6035C117.189 11.3666 123.056 5.5 130.293 5.5H138.483V182.397C138.483 189.633 132.616 195.5 125.379 195.5H117.189V18.6035Z" fill="#B8F580"/>
</svg>`;

const logoMarkDarkSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M62 80.8449C62 73.6081 67.8666 67.7415 75.1034 67.7415H81.6552V120.155C81.6552 127.392 75.7886 133.259 68.5517 133.259H62V80.8449Z" fill="#001C27"/>
<path d="M89.8457 54.6303C89.8457 47.3935 95.7123 41.5269 102.949 41.5269H109.501V147.992C109.501 155.229 103.634 161.096 96.3974 161.096H89.8457V54.6303Z" fill="#001C27"/>
<path d="M117.689 18.6035C117.689 11.3666 123.556 5.5 130.793 5.5H138.983V182.397C138.983 189.633 133.116 195.5 125.879 195.5H117.689V18.6035Z" fill="#001C27"/>
</svg>`;

const logoMarkLightSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M62 80.8449C62 73.6081 67.8666 67.7415 75.1034 67.7415H81.6552V120.155C81.6552 127.392 75.7886 133.259 68.5517 133.259H62V80.8449Z" fill="#F8FFE8"/>
<path d="M89.8457 54.6303C89.8457 47.3935 95.7123 41.5269 102.949 41.5269H109.501V147.992C109.501 155.229 103.634 161.096 96.3974 161.096H89.8457V54.6303Z" fill="#F8FFE8"/>
<path d="M117.689 18.6035C117.689 11.3666 123.556 5.5 130.793 5.5H138.983V182.397C138.983 189.633 133.116 195.5 125.879 195.5H117.689V18.6035Z" fill="#F8FFE8"/>
</svg>`;

// App Icon SVGs
const appIconDarkBgSvg = `<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="279.253" height="279.253" rx="54" fill="#001C27"/>
<path d="M97.25 119.137C97.25 111.497 103.444 105.303 111.084 105.303H118V160.637C118 168.278 111.807 174.471 104.167 174.471H97.25V119.137Z" fill="#B8F580"/>
<path d="M126.646 91.4612C126.646 83.8212 132.84 77.6277 140.48 77.6277H147.397V190.025C147.397 197.666 141.203 203.859 133.563 203.859H126.646V91.4612Z" fill="#B8F580"/>
<path d="M156.043 53.4272C156.043 45.7871 162.236 39.5936 169.877 39.5936H178.523V226.347C178.523 233.987 172.329 240.18 164.689 240.18H156.043V53.4272Z" fill="#B8F580"/>
</svg>`;

const appIconGreenBgSvg = `<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="279.253" height="279.253" rx="54" fill="#D5F391"/>
<path d="M98.6426 119.202C98.6426 111.562 104.836 105.368 112.476 105.368H119.393V160.703C119.393 168.343 113.199 174.536 105.559 174.536H98.6426V119.202Z" fill="#001C27"/>
<path d="M128.039 91.5265C128.039 83.8865 134.233 77.693 141.873 77.693H148.789V190.091C148.789 197.731 142.596 203.924 134.956 203.924H128.039V91.5265Z" fill="#001C27"/>
<path d="M157.436 53.4923C157.436 45.8522 163.629 39.6587 171.269 39.6587H179.915V226.412C179.915 234.052 173.722 240.246 166.082 240.246H157.436V53.4923Z" fill="#001C27"/>
</svg>`;

const appIconLightBgSvg = `<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="279.253" height="279.253" rx="54" fill="#F8FFE8"/>
<path d="M98.6426 119.202C98.6426 111.562 104.836 105.368 112.476 105.368H119.393V160.703C119.393 168.343 113.199 174.536 105.559 174.536H98.6426V119.202Z" fill="black"/>
<path d="M128.039 91.5265C128.039 83.8865 134.233 77.693 141.873 77.693H148.789V190.091C148.789 197.731 142.596 203.924 134.956 203.924H128.039V91.5265Z" fill="black"/>
<path d="M157.436 53.4923C157.436 45.8522 163.629 39.6587 171.269 39.6587H179.915V226.412C179.915 234.052 173.722 240.246 166.082 240.246H157.436V53.4923Z" fill="black"/>
</svg>`;

const appIconBlackBgSvg = `<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="279.253" height="279.253" rx="54" fill="black"/>
<path d="M98.6426 119.202C98.6426 111.562 104.836 105.368 112.476 105.368H119.393V160.703C119.393 168.343 113.199 174.536 105.559 174.536H98.6426V119.202Z" fill="#F8FFE8"/>
<path d="M128.039 91.5265C128.039 83.8865 134.233 77.693 141.873 77.693H148.789V190.091C148.789 197.731 142.596 203.924 134.956 203.924H128.039V91.5265Z" fill="#F8FFE8"/>
<path d="M157.436 53.4923C157.436 45.8522 163.629 39.6587 171.269 39.6587H179.915V226.412C179.915 234.052 173.722 240.246 166.082 240.246H157.436V53.4923Z" fill="#F8FFE8"/>
</svg>`;

export function DownloadBrandAssetSection() {
  const handleDownload = (logoType: 'light' | 'dark') => {
    const svgContent = logoType === 'light' ? lightLogoSvg : darkLogoSvg;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kotulapay-logo-${logoType}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogoMarkDownload = (logoMarkType: 'green' | 'dark' | 'light') => {
    const svgContent = logoMarkType === 'green' ? logoMarkGreenSvg : logoMarkType === 'dark' ? logoMarkDarkSvg : logoMarkLightSvg;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kotulapay-logomark-${logoMarkType}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAppIconDownload = (iconType: 'dark-bg' | 'green-bg' | 'light-bg' | 'black-bg') => {
    const svgContent =
      iconType === 'dark-bg' ? appIconDarkBgSvg :
      iconType === 'green-bg' ? appIconGreenBgSvg :
      iconType === 'light-bg' ? appIconLightBgSvg :
      appIconBlackBgSvg;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kotulapay-appicon-${iconType}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Download official KotulaPay logo assets for use in your projects, presentations, and marketing materials.
          Our logos are available in both light and dark versions to ensure optimal visibility across different backgrounds.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          Please ensure you follow our brand guidelines when using these assets. The logos are provided in SVG format
          for maximum scalability and quality.
        </p>
      </motion.div>

      {/* Full Logo Assets */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#001c26] mb-6">Full Logo</h2>
        <div className="grid gap-8 md:grid-cols-2">
        {/* Light Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group"
        >
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {/* Logo Preview */}
            <div className="bg-[#001c26] p-8 flex items-center justify-center">
              <div
                className="w-full [&>svg]:w-full [&>svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: lightLogoSvg }}
              />
            </div>

            {/* Info and Download */}
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-[#001c26] mb-2">Light Logo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Use on dark backgrounds for optimal contrast and visibility
              </p>
              <button
                onClick={() => handleDownload('light')}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-3 text-sm font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
              >
                <Download className="size-4" />
                Download SVG
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dark Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group"
        >
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {/* Logo Preview */}
            <div className="bg-gray-50 p-8 flex items-center justify-center border-b border-gray-200">
              <div
                className="w-full [&>svg]:w-full [&>svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: darkLogoSvg }}
              />
            </div>

            {/* Info and Download */}
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-[#001c26] mb-2">Dark Logo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Use on light backgrounds for optimal contrast and visibility
              </p>
              <button
                onClick={() => handleDownload('dark')}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-3 text-sm font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
              >
                <Download className="size-4" />
                Download SVG
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Logo Mark Assets */}
      <div>
        <h2 className="text-2xl font-bold text-[#001c26] mb-6">Logo Mark</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Green Logo Mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#001c26] p-8 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: logoMarkGreenSvg }}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-[#001c26] mb-2">Green Logo Mark</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Primary logo mark on dark backgrounds
                </p>
                <button
                  onClick={() => handleLogoMarkDownload('green')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-3 text-sm font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-4" />
                  Download SVG
                </button>
              </div>
            </div>
          </motion.div>

          {/* Dark Logo Mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gray-50 p-8 flex items-center justify-center aspect-square border-b border-gray-200">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: logoMarkDarkSvg }}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-[#001c26] mb-2">Dark Logo Mark</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Logo mark for light backgrounds
                </p>
                <button
                  onClick={() => handleLogoMarkDownload('dark')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-3 text-sm font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-4" />
                  Download SVG
                </button>
              </div>
            </div>
          </motion.div>

          {/* Light Logo Mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#001c26] p-8 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: logoMarkLightSvg }}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-[#001c26] mb-2">Light Logo Mark</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Logo mark for dark backgrounds
                </p>
                <button
                  onClick={() => handleLogoMarkDownload('light')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-6 py-3 text-sm font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-4" />
                  Download SVG
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* App Icon Assets */}
      <div>
        <h2 className="text-2xl font-bold text-[#001c26] mb-6">App Icons</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {/* Dark Background App Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: appIconDarkBgSvg }}
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-base font-bold text-[#001c26] mb-1">Dark Navy</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Primary app icon
                </p>
                <button
                  onClick={() => handleAppIconDownload('dark-bg')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-4 py-2 text-xs font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-3" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>

          {/* Green Background App Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: appIconGreenBgSvg }}
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-base font-bold text-[#001c26] mb-1">Light Green</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Alternate variant
                </p>
                <button
                  onClick={() => handleAppIconDownload('green-bg')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-4 py-2 text-xs font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-3" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>

          {/* Light Background App Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: appIconLightBgSvg }}
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-base font-bold text-[#001c26] mb-1">Light Cream</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Light variant
                </p>
                <button
                  onClick={() => handleAppIconDownload('light-bg')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-4 py-2 text-xs font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-3" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>

          {/* Black Background App Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center aspect-square">
                <div
                  className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: appIconBlackBgSvg }}
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-base font-bold text-[#001c26] mb-1">True Black</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Dark mode variant
                </p>
                <button
                  onClick={() => handleAppIconDownload('black-bg')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#c5e063] px-4 py-2 text-xs font-semibold text-[#001c26] transition-all hover:bg-[#b8f27e] hover:shadow-md"
                >
                  <Download className="size-3" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
