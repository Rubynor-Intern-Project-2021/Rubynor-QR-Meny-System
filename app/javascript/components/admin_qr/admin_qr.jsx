import React from 'react'
import QRCode from 'easyqrcodejs';
import all from 'text-image';

const AdminQr = ({restaurant_id}) => {
    const generateQrCode = (event) => {
        event.preventDefault();
        document.getElementById("qr_code").innerHTML = "";
        const location = event.target.location.value;



        var style = {
            // Tailwind.css font family
            font: 'Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            align: 'center',
            color: 'rgba(55, 65, 81, 255)',
            size: 48,
            background: 'rgba(255, 255, 255, 255)',
        }


        var textImage = window.TextImage(style);
        var data = textImage.toDataURL(location);

        console.log(data);

        const options = {
            text: window.location.host + Routes.restaurant_path(restaurant_id) + "?location=" + location,
            logo: data,
            width: 256,
            height: 256,
            dotScale: 0.5,
            colorDark: 'rgba(55, 65, 81, 255)',
            colorLight: 'rgba(255, 255, 255, 255)',

        };

        new QRCode(document.getElementById("qr_code"), options);



    };

    return (
        <div>
        <form onSubmit={generateQrCode}>
            <div>
                <label>Bord Nr:</label>
            </div>
            <div>
                <input name="location" type="text"></input>
            </div>
            <div className="py-2">
                <input className="text-sm bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 py-1 px-2" type="submit" value="Generer"></input>
            </div>
        </form>
        <div id="qr_code"></div>
        </div>
    )
}

export default AdminQr;