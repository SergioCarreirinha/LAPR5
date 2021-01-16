using System.Threading.Tasks;
using System.Xml;
using System;
using System.Collections.Generic;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Service
{

    public class FileUploadService{

        private readonly DriverDutyService serviceDDS;
        private readonly DriverDutyTypeService serviceDDTS;
        private readonly DriverService serviceDS;
        private readonly ParameterValueService servicePVS;
        private readonly PassingTimeService servicePTS;
        private readonly TripService serviceTS;
        private readonly VehicleDutyService serviceVDS;
        private readonly VehicleService serviceVS;
        private readonly WorkBlockService serviceWS;
        private readonly IPassingTimeRepository repoPTR;
        private readonly ITripRepository repoT;
        private readonly IWorkBlockRepository repoWB;

        public FileUploadService(DriverDutyService dds, DriverDutyTypeService ddts, DriverService ds, ParameterValueService pvs, PassingTimeService pts, TripService ts, VehicleDutyService vds, VehicleService vs, WorkBlockService ws, 
        IPassingTimeRepository ptr, ITripRepository tP, IWorkBlockRepository wR)
        {
            serviceDDS = dds;
            serviceDDTS = ddts;
            serviceDS = ds;
            servicePVS = pvs;
            servicePTS = pts;
            serviceTS = ts;
            serviceVDS = vds;
            serviceVS = vs;
            serviceWS = ws;
            repoPTR = ptr;
            repoT = tP;
            repoWB = wR;
        }

        public async Task<bool> ImportFile(string path)
        {
            XmlDocument document = new XmlDocument();
            document.Load(path);

            if(await InsertTrips(document)){
                if(await InsertWorkBlocks(document))
                {
                    if(await InsertVehicleDuty(document)){
                        if(await InsertDriverDuty(document)){
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        private async Task<bool> InsertTrips(XmlDocument document){
            XmlNodeList elements = document.GetElementsByTagName("Trip");

            if(elements != null)
            {
                foreach(XmlNode tripXML in elements){
                    if(tripXML.Attributes["Line"] != null) {
                        string keyT = tripXML.Attributes["key"].InnerText;
                        string orientationT = tripXML.Attributes["Orientation"].InnerText;
                        string pathT = tripXML.Attributes["Path"].InnerText;
                        string IsEmptyT = tripXML.Attributes["IsEmpty"].InnerText;
                        string IsGeneratedT = tripXML.Attributes["IsGenerated"].InnerText;
                        string lineT = tripXML.Attributes["Line"].InnerText;
                        List<PassingTime> list = new List<PassingTime>();
                        XmlNodeList childElements = tripXML.ChildNodes[0].ChildNodes;

                        foreach(XmlNode passingTimeXML in childElements){
                            try {
                                string keyP = passingTimeXML.Attributes["key"].InnerText;
                                string nodeP = passingTimeXML.Attributes["Node"].InnerText;
                                bool IsReliefPointP = Convert.ToBoolean(passingTimeXML.Attributes["IsReliefPoint"].InnerText);
                                bool IsUsedP = Convert.ToBoolean(passingTimeXML.Attributes["IsUsed"].InnerText);
                                string timeP = passingTimeXML.Attributes["Time"].InnerText;
                                list.Add(new PassingTime(keyP, timeP, nodeP, IsUsedP, IsReliefPointP));
                            } catch (NullReferenceException e) {
                                throw e;
                            }
                        }

                        await serviceTS.CreateWithoutVerifications(new ITripDTO{
                            key = keyT,
                            Orientation = orientationT,
                            Path = pathT,
                            IsEmpty = IsEmptyT,
                            IsGenerated = IsGeneratedT,
                            Line = lineT,
                            PassingTimes = list
                        });
                    }
                }
                return true;
            } else {
                return false;
            }
        }

        private async Task<bool> InsertWorkBlocks(XmlDocument document){

            XmlNodeList elements = document.GetElementsByTagName("WorkBlock");

            if(elements != null){
                foreach(XmlNode wbXML in elements) {
                    try {
                        string keyWB = wbXML.Attributes["key"].InnerText;
                        bool isActiveWB = Convert.ToBoolean(wbXML.Attributes["IsActive"].InnerText);
                        bool isCrewTravelTimeWB = Convert.ToBoolean(wbXML.Attributes["IsCrewTravelTime"].InnerText);
                        string endNodeWB = wbXML.Attributes["EndNode"].InnerText;
                        string startNodeWB = wbXML.Attributes["StartNode"].InnerText;
                        int endTimeWB = Convert.ToInt32(wbXML.Attributes["EndTime"].InnerText);
                        int startTimeWB = Convert.ToInt32(wbXML.Attributes["StartTime"].InnerText);
                        List<Tripes> tripsList = new List<Tripes>();
                        XmlNodeList childElements = wbXML.ChildNodes[0].ChildNodes;

                        foreach(XmlNode tripRef in childElements){
                            string keyT = tripRef.Attributes["key"].InnerText;
                            Tripes toAdd = await repoT.getTripByKey(keyT);
                            if(toAdd != null) {
                                tripsList.Add(toAdd);
                            }
                        }

                        await serviceWS.CreateWithoutVerifications(new IWorkBlockDTO{
                            key = keyWB,
                            isActive = isActiveWB,
                            isCrewTravelTime = isCrewTravelTimeWB,
                            endNode = endNodeWB,
                            startNode = startNodeWB,
                            endTime = endTimeWB,
                            startTime = startTimeWB,
                            trips = tripsList
                        });
                    } catch(NullReferenceException e) {
                        throw e;
                    }
                }
                return true;
            } else {
                return false;
            }
        }

        private async Task<bool> InsertVehicleDuty(XmlDocument document){

            XmlNodeList elements = document.GetElementsByTagName("VehicleDuty");

            if(elements != null){
                foreach(XmlNode vdXML in elements) {
                    try {
                        string keyVD = vdXML.Attributes["key"].InnerText;
                        string nameVD = vdXML.Attributes["Name"].InnerText;
                        string colorVD = vdXML.Attributes["Color"].InnerText;
                        string depotsVD = vdXML.Attributes["Depots"].InnerText;
                        
                        List<WorkBlock> wbList = new List<WorkBlock>();
                        XmlNodeList childElements = vdXML.ChildNodes[0].ChildNodes;

                        foreach(XmlNode wbRef in childElements){
                            string keyT = wbRef.Attributes["key"].InnerText;
                            wbList.Add((await repoWB.getWbByKey(keyT)));
                        }

                        await serviceVDS.CreateWithoutVerifications(new IVehicleDutyDTO{
                            key = keyVD,
                            name = nameVD,
                            color = colorVD,
                            depots = depotsVD,
                            WorkBlocks = wbList
                        });
                    } catch(NullReferenceException e) {
                        throw e;
                    }
                }
                return true;
            } else {
                return false;
            }
        }

        private async Task<bool> InsertDriverDuty(XmlDocument document){

            XmlNodeList elements = document.GetElementsByTagName("DriverDuty");

            if(elements != null){
                foreach(XmlNode ddXML in elements) {
                    try {
                        string keyDD = ddXML.Attributes["key"].InnerText;
                        string nameDD = ddXML.Attributes["Name"].InnerText;
                        string colorDD = ddXML.Attributes["Color"].InnerText;
                        string typeDD = ddXML.Attributes["DriverDutyType"].InnerText;
                        
                        List<WorkBlock> wbList = new List<WorkBlock>();
                        XmlNodeList childElements = ddXML.ChildNodes[0].ChildNodes;

                        foreach(XmlNode wbRef in childElements){
                            string keyT = wbRef.Attributes["key"].InnerText;
                            wbList.Add((await repoWB.getWbByKey(keyT)));
                        }

                        await serviceDDS.CreateWithoutVerifications(new IDriverDutyDTO{
                            key = keyDD,
                            name = nameDD,
                            color = colorDD,
                            type = typeDD,
                            workBlocks = wbList
                        });
                    } catch(NullReferenceException e) {
                        throw e;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
    }
}