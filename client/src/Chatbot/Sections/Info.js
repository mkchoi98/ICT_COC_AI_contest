
function readTextFilw(str) {

    var rowData=str.split(',')
    var take_place=rowData[2]
    var get_date=rowData[3]
    var get_name=rowData[4]
    //var get_area=rowData[5]
    var get_position=rowData[6]

    var str1='습득물 데이터를 찾았어요^^'
    var str1_1='--------------------------------------------'
    var str2='날짜 : '+ get_date.toString().substring(0,4)+'년 '+get_date.toString().substring(4,6)+'월 '+get_date.toString().substring(6,8)+'일'
    var str3='분실물 : '+get_name
    var str4='장소 : '+get_position+' '+take_place

    return [str1, str1_1, str2, str3, str4]
}

export default readTextFilw