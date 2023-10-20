import TimeAgo from "javascript-time-ago";

import localeData from "javascript-time-ago/locale/es-AR";

TimeAgo.addDefaultLocale(localeData);

export const getTimeAgo = (date: Date) => {
    const timeAgo = new TimeAgo("es-AR");

    return timeAgo.format(date);
};
