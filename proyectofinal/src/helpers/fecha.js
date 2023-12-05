/**
 * 
 * Formatea fecha a un formato elegido
 * 
 * @param {Date|null} date 
 */

export function dateToString(date)
{
    if(date == null) return null;
    // let y = date.getFullYear();
    // let m = date.getMonth()+1;
    // let d = date.getDay();

    // let h = date.getHours();
    // let min = date.getMinutes();

    // return `${d}-${m}-${y}--${h}:${min}`;

    const dateFormat = new Intl.DateTimeFormat('es-Ar', {month: '2-digit', day: '2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'}).format(date);
    return dateFormat.replace(',', ' ');

}