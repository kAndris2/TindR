import React, { Component } from 'react'

export default class InvalidPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <div style={{width:'50%', marginRight:'auto', marginLeft:'auto', display:'block'}}>
                <svg 
                    xmlns={{svg:"http://www.w3.org/2000/svg"}} 
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1" 
                    width="575px" 
                    height="575px" 
                    viewBox="-2 -2 1525 1525"
                >
                    <defs />
                    <g transform="translate(419.34,155.03)">
                        <path
                            d="M 322.86,1367.5 C 127.98,1362.9 -57.878,1283.1 -196.48,1144.7 -302.25,1039.1 -375.33,903.3 -404.5,758.15 -415.01,705.84 -419.34,661.54 -419.34,606.15 -419.34,566.44 -417.82,542.14 -413.07,505.68 -398,390.11 -356,279.2 -290.36,181.65 -242.46,110.47 -184.17,48.932 -116.14,-2.2632 -11.921,-80.698 109.73,-130.86 237.86,-148.24 276.29,-153.45 300.45,-155.03 341.86,-155.03 383.27,-155.03 407.42,-153.45 445.86,-148.24 680.44,-116.42 887.42,24.226 1005.2,231.81 1057.1,323.31 1089.7,426.66 1099.8,531.65 1104.3,578.96 1104.3,633.34 1099.8,680.65 1087.7,805.71 1044.6,925.84 974.07,1030.6 887.06,1160 763.98,1258.7 618.86,1315.7 526.17,1352 424.09,1369.9 322.86,1367.5 z M 378.86,1235.7 C 416.81,1230.2 454.78,1216.5 485.21,1197.3 525.9,1171.8 561.75,1133.4 582.13,1093.5 601.27,1056.1 610.71,1019 612.87,972.81 613.9,950.68 614.21,709.94 613.22,703.9 L 612.6,700.15 341.81,700.15 71.028,700.15 70.339,707.5 C 69.96,711.54 69.874,773.31 70.148,844.75 70.679,983.12 70.876,989.15 75.847,1018.6 81.76,1053.6 95.464,1086.7 118.15,1120.6 131.49,1140.6 160.11,1170.7 177.86,1183.3 197.92,1197.6 219.55,1210 237.86,1217.7 260.17,1227.1 289.23,1234.4 315.32,1237.2 327.11,1238.4 366.59,1237.5 378.86,1235.7 z M 313.86,999.65 C 313.86,959.6 313.48,930.15 312.97,930.15 311.14,930.15 301.6,920.65 298,915.25 291.09,904.88 288.68,897.1 288.68,885.17 288.68,870.01 293.7,857.54 304.02,847.06 313.92,837.01 327.33,831.67 342.36,831.8 366.35,832 386.53,847.18 393.26,870.08 395.77,878.62 395.38,892.38 392.37,901.92 389.18,912.01 381.65,922.96 374.84,927.42 L 369.89,930.65 369.88,999.9 369.86,1069.1 341.86,1069.1 313.86,1069.1 313.86,999.65 z M 205.62,651.05 205.36,619.95 184.36,612.52 C 144.83,598.55 140.55,597.12 139.97,597.7 139.07,598.6 137.53,672.47 138.3,677.61 L 138.98,682.15 172.43,682.15 205.89,682.15 z M 545.48,642.44 C 544.91,608.63 544.4,597.15 543.45,597.15 541.37,597.15 480.79,619.03 479.1,620.4 478.11,621.19 477.95,627.88 478.36,651.03 478.65,667.32 478.88,680.95 478.87,681.31 478.86,681.67 494,682.03 512.51,682.1 L 546.16,682.23 z M 246.39,609.68 C 255.89,604.12 261.2,594.73 261.14,583.65 261.09,575.11 258.63,568.91 253.47,564.38 248.3,559.84 246.02,558.82 224.02,551.18 158.62,528.47 66.519,493.18 26.357,475.43 6.1536,466.5 0.57807,464.7 -6.6549,464.8 -15.711,464.92 -24.984,471.22 -29.963,480.65 -32.18,484.85 -32.605,486.93 -32.606,493.65 -32.608,502.89 -30.603,507.78 -24.688,512.97 -20.066,517.03 -18.821,517.65 5.1472,527.79 61.724,551.73 102.63,567.63 164.36,589.66 180.31,595.36 199.66,602.34 207.36,605.19 230.57,613.76 237.98,614.61 246.39,609.68 z M 462.41,609.76 C 525.26,588.37 617.09,553.41 681.62,526.3 710.53,514.16 715.67,509.75 716.6,496.3 717.79,478.98 703.35,462.95 687.89,464.45 682.68,464.95 668.56,470.35 632.36,485.69 591.41,503.03 533.65,524.91 461.94,550.24 437.39,558.91 432.55,561.28 427.9,566.9 414.09,583.55 427.29,612.54 448.91,613.06 450.87,613.11 456.94,611.62 462.41,609.76 z M -25.143,593.69 C -10.058,591.38 2.4458,586.5 15.357,577.86 26.089,570.67 39.627,558.72 38.071,557.8 37.678,557.57 25.644,552.42 11.328,546.35 L -14.7,535.32 -23.672,537.19 C -28.606,538.23 -34.471,539.09 -36.705,539.11 -42.466,539.16 -53.646,536.02 -68.143,530.28 -82.945,524.41 -93.719,519.59 -118.64,507.66 -126.34,503.98 -137.05,498.97 -142.44,496.54 -164.01,486.79 -170.39,481.54 -176.15,468.78 L -179.64,461.06 -205.74,448.1 C -220.1,440.98 -232.36,435.15 -232.99,435.15 -233.78,435.15 -234.14,438.1 -234.14,444.42 -234.14,484.25 -219.28,515.73 -192.13,533.41 -185.17,537.94 -152.41,555.15 -150.74,555.15 -150.48,555.15 -137.98,560.83 -122.96,567.77 -66.926,593.65 -51.568,597.72 -25.143,593.69 z M 745.62,592.2 C 757.66,589.24 770.41,584.26 796.86,572.17 809.78,566.26 825.76,559.05 832.36,556.15 859.06,544.42 880.17,532.06 888.96,523.04 902.19,509.46 911.26,491.62 915.37,471.12 916.99,463.02 918.61,435.15 917.45,435.15 917.07,435.15 904.8,440.86 890.2,447.84 868.39,458.28 863.49,460.99 862.71,463.09 859.54,471.58 852.82,480.96 846.29,485.97 844.06,487.69 834.38,492.75 824.79,497.22 815.2,501.69 798.13,509.64 786.86,514.88 751.07,531.53 730.09,539.18 720.42,539.12 718.18,539.11 712.53,538.23 707.86,537.17 L 699.36,535.23 672.86,546.29 C 658.28,552.36 646.02,557.66 645.6,558.05 645.19,558.44 647.21,561.03 650.1,563.81 666.01,579.11 686.18,589.57 707.6,593.63 717.66,595.54 734.61,594.9 745.62,592.2 z M 245.4,527.38 C 265.49,507.63 286.89,495.71 313.36,489.52 319.73,488.03 325.33,487.65 340.86,487.65 362.19,487.65 369.29,488.69 386.36,494.35 405.58,500.72 426.76,514.64 442.09,530.98 445.79,534.92 449.43,538.15 450.18,538.15 453.25,538.15 511.67,517.35 513.78,515.5 514.73,514.67 500.49,495.06 492.83,486.65 473.71,465.65 457.25,453.26 432.36,441.1 373.63,412.43 307.82,412.18 251.36,440.4 231.17,450.49 216.99,460.89 199.29,478.58 187.33,490.55 169.86,512.01 169.86,514.75 169.86,515.37 174.24,517.58 179.61,519.66 193.44,525.02 231.06,538.03 232.9,538.1 233.75,538.12 239.38,533.3 245.4,527.38 z M 659.68,458.51 C 665.7,455.99 666.13,455.57 669,449.51 673.66,439.64 680.32,433.08 691.16,427.67 707.4,419.57 786.15,384.02 792.36,381.99 799.74,379.57 809.8,379.4 819.59,381.54 L 826.81,383.11 852.34,370.67 C 866.37,363.82 877.86,357.8 877.86,357.27 877.86,356.75 875.72,354.43 873.11,352.12 856.95,337.83 833.36,327.56 810.78,324.99 798.91,323.64 784.99,325.05 774.17,328.68 764.53,331.91 674.01,372.86 662.36,379.25 632.1,395.86 615.16,425.31 612.31,466.31 611.94,471.63 611.9,476.41 612.23,476.95 612.75,477.78 625.21,472.94 659.68,458.51 z M 71.403,467.4 C 69.182,436.08 59.736,413.19 41.357,394.59 30.382,383.48 24.174,379.43 6.0854,371.56 -6.0121,366.29 -9.8601,364.55 -29.643,355.41 -49.458,346.25 -79.649,332.86 -86.143,330.35 -113.29,319.87 -146.82,323.92 -174.07,340.96 -180.88,345.21 -193.64,355.9 -193.64,357.34 -193.64,358.58 -151.64,379.86 -145.64,381.66 -142.49,382.6 -140.37,382.58 -135.64,381.56 -126.49,379.6 -115.06,379.82 -108.36,382.08 -105.22,383.15 -94.768,387.69 -85.143,392.17 -75.518,396.66 -54.644,406.17 -38.756,413.31 -22.868,420.44 -7.3434,427.7 -4.2561,429.43 3.6613,433.87 10.957,441.5 14.612,449.16 L 17.704,455.65 43.031,466.29 C 56.96,472.14 69.198,476.97 70.226,477.04 71.975,477.14 72.051,476.52 71.403,467.4 z M -144.69,451.21 C -133.32,446.01 -125.54,430.77 -128,418.51 -129.19,412.58 -132.82,406.48 -136.91,403.53 -140.29,401.08 -234.32,354.15 -235.83,354.15 -238.3,354.15 -256.99,402.51 -255.76,405.71 -255.08,407.47 -166.32,451.76 -160.95,453.01 -155.62,454.26 -149.98,453.63 -144.69,451.21 z M 854.25,448.97 C 869.87,442.1 938.98,406.99 939.49,405.67 940.7,402.51 921.99,354.15 919.56,354.15 918.96,354.15 896.32,365.18 869.24,378.65 816.13,405.08 815.15,405.71 812.72,414.65 811.06,420.76 812.12,431.96 814.88,437.49 817.54,442.81 822.9,448.58 827.36,450.91 835.27,455.06 841.44,454.61 854.25,448.97 z"
                            id="path8818"
                            style={{fill:'#004488', fillOpacity:'1'}} />
                    </g>
                </svg>
                <h2>You have no permission to access this page!</h2>
            </div>
        );
    }
}