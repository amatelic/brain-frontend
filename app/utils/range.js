export default function range(min, max) {
    return Array.apply(null, Array(max ? Math.abs(min - max)+1 : min)).map(function (a, i) {return i+(max?min:0);});
}
