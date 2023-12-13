

// Writes text to an svg, with a css class and optional id
export function text(text, svg, style, x, y, id = "") {
    const textElm =
        svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("pointer-events", "none")
            .text(text)
            .classed(style, true)

    // Give it an id, if provided
    if (id != "")
        textElm.attr("id", id);

    return textElm;
}

// Writes centered text to an svg, but pass in a css class (Doesn't actually center..)
export function centeredText(text, svg, style, x1, width, y, id = "") {
    const textElm = svg.append("text")
        .attr("x", x1 + (width / 2))
        .attr("y", y)
        .attr("text-anchor", "middle")
        .text(text)
        .classed(style, true);

    // Give it an id, if provided
    if (id != "")
        textElm.attr("id", id);
}


// Writes right justified text to an svg, but pass in a css class
export function rightText(text, svg, style, x1, width, y) {
    if (text === "NaN")
        return;

    svg.append("text")
        .attr("x", x1 + width)
        .attr("y", y)
        .attr("text-anchor", "end")
        .text(text)
        .classed(style, true);
}

export function secondsToString(secs) {
    //var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - (hours * 3600)) / 60);
    var seconds = secs - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return hours + ':' + minutes + ':' + seconds;
}


// January 1, 2022 or
// Tuesday, January 1, 2022
export function formatDate(date, includeDayOfWeek = false) {
    var daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    const rslt = monthNames[monthIndex] + ' ' + day + ", " + year;

    if (!includeDayOfWeek)
        return rslt;
    else
        return daysOfWeek[date.getDay()] + ", " + rslt;
}


// Inserts value at index postition of str
export function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}


export function className(name){
    if (!name)
        return "";

    name = name.replace(/\W/g, '')
    return name.replace(/\s+/g, '');
}


export function partyColor(party) {
    const partyColors = [
        { party: "Democrat", color: "blue" },
        { party: "Republican", color: "red" },
        { party: "Green", color: "green" }
    ];
    let partyColor = partyColors.find(d => d.party == party);
    return partyColor ? ` ${partyColor.color} ` : ` black `;
}


// Slugifies a string or an array of strings
export function slugify(stringOrStrings) {

    function slug(text) {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
    }

    if (!Array.isArray(stringOrStrings))
        return slug(stringOrStrings);

    const slugifieds = stringOrStrings.map(x => slugify(x));
    return slugifieds.join('-');
}


/**
 * https://gist.github.com/holmberd/945375f099cbb4139e37fef8055bc430
 * Creates nested groups by object properties.
 * `properties` array nest from highest(index = 0) to lowest level.
 *
 * @param {String[]} properties
 * @returns {Object}
 */
export function nestGroupsBy(arr, properties) {
    properties = Array.from(properties);
    if (properties.length === 1) {
        return groupBy(arr, properties[0]);
    }
    const property = properties.shift();
    var grouped = groupBy(arr, property);
    for (let key in grouped) {
        grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
    }
    return grouped;
}


// Group objects by property.
// nestGroupsBy` helper method.
function groupBy(conversions, property) {
    return conversions.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
}


// Represent a number as an ordinal numeral (1st, 2nd, etc)
export function ordinal_suffix(n) {
  if (n == 0)
    return "";

  const SPECIAL_ORDINAL_SUFFIXES = [, "st", "nd", "rd"];
  switch (n % 100) {
    case 11:
    case 12:
    case 13:
      return "th";
  }
  return SPECIAL_ORDINAL_SUFFIXES[n % 10] || "th";
};