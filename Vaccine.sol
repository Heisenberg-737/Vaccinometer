pragma solidity ^0.5.0;

contract Vaccine{

    struct medCenter{
        address medCenterId;
        string name;
    }
    
    struct vaccine{
        address companyAdd;
        uint vaccineId;
        string vaccineName;
        string mfgDate;
        string expiry;
    }
    
    vaccine[] vaccines;
    medCenter[] centres;
    
    mapping(uint=>medCenter) delivery;

    function addVaccine(address _companyAdd,uint _id,string memory _name,string memory _mfgDate,string memory _expiry) public{
        vaccine memory newVacc=vaccine({companyAdd:_companyAdd,vaccineId:_id,vaccineName:_name,mfgDate:_mfgDate,expiry:_expiry});
        vaccines.push(newVacc);
    }
    
    function addCenter(address _id,string memory _name) public{
        medCenter memory newCentre=medCenter({medCenterId:_id,name:_name});
        centres.push(newCentre);
    }
    
    function addVaccineToCenter(uint _id,address _medCenterId) public{
        for(uint i=0;i<centres.length;i++){
            if(centres[i].medCenterId==_medCenterId){
                delivery[_id]=centres[i];
            }
        }
        
    }
    
    function getMedCenterInfo(address _id) public view returns(string memory){
        for(uint i=0;i<centres.length;i++){
            if(centres[i].medCenterId==_id){
                return centres[i].name;
            }
        }
        return "";
    } 
    
    function getVaccineInfo(uint _id) public view returns(address,string memory){
        for(uint i=0;i<vaccines.length;i++){
            if(vaccines[i].vaccineId==_id){
                return (vaccines[i].companyAdd,vaccines[i].vaccineName);
            }
        }
        return (address(0),"");
    }
    
}