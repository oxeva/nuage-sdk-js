/**
 * Return formatted date
 *
 * time(); // 12:34:22
 */
export default function time(date) {
    const options = {
        hour: 'numeric',
        hour12: false,
        minute: 'numeric',
        second: 'numeric',
    };

    const { language } = window.navigator;

    const currentHour = new Intl.DateTimeFormat(language, options).format(
        date || new Date(),
    );

    return currentHour;
}
