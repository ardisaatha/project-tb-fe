import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "../geojson/data";
import { getLocationById } from "../store/actions/location";
import { getIntervention, getKerentanan } from "../store/actions/predict";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onSelect, setOnSelect] = useState(false);
  // const [modal, setModal] = useState(false);
  const { dataById, totalPas, hit } = useSelector(
    (state) => state.locationReducers
  );
  const { kerentanan, intervensi, dataKerentanan } = useSelector(
    (state) => state.predictReducers
  );
  // console.log(dataKerentanan);

  //   get response from api get location by id
  const getById = async (id) => {
    await dispatch(getLocationById(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  };

  const kerentananHandler = async (id) => {
    await dispatch(getKerentanan(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  };

  const interventionHandler = async (id) => {
    await dispatch(getIntervention(id))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  };

  // console.log(getKerentanan(8));

  // const rendah = data.filter((data) => data.jumlah_pasien === 0);
  // const lumayan = data.filter(
  //   (data) => data.jumlah_pasien < 25 && data.jumlah_pasien > 0
  // );
  // const cukup = data.filter(
  //   (data) => data.jumlah_pasien < 50 && data.jumlah_pasien > 25
  // );
  // const agakRentan = data.filter(
  //   (data) => data.jumlah_pasien < 80 && data.jumlah_pasien > 50
  // );
  // const rentan = data.filter(
  //   (data) => data.jumlah_pasien < 125 && data.jumlah_pasien > 80
  // );
  // const iniBahaya = data.filter(
  //   (data) => data.jumlah_pasien < 150 && data.jumlah_pasien > 125
  // );
  // const rentanBanget = data.filter(
  //   (data) => data.jumlah_pasien < 170 && data.jumlah_pasien > 150
  // );
  // const serem = data.filter((data) => data.jumlah_pasien > 170);

  //   setting for mapping use leaflet
  const center = [-7.019679560453046, 110.39818740013446];

  let dataCase = {};
  if (dataKerentanan) {
    dataKerentanan?.forEach((item) => {
      dataCase[item.id] = item.kategori_kerentanan;
    });
  }
  // console.log(dataKerentanan);

  const style = (feature) => {
    let ketKerentanan = dataCase?.[feature.properties.gid];
    let colors;
    if (ketKerentanan === "Tidak Rentan") {
      colors = "#059335";
    } else if (ketKerentanan === "Cukup Rentan") {
      colors = "#FFB800";
    } else if (ketKerentanan === "Rentan") {
      colors = "#ff0000";
    } else if (ketKerentanan === "Sangat Rentan") {
      colors = "#00000";
    }
    return {
      fillColor: colors,
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 1,
    };
  };

  const highlightFeature = (e) => {
    const data = e.target.feature.properties.gid;
    var layer = e.target;
    getById(data);
    kerentananHandler(data);
    interventionHandler(data);
    layer.setStyle({
      fillOpacity: 1,
      weight: 4,
      dashArray: "",
      color: "black",
      // fillColor: "#D45962",
    });
    setOnSelect(true);
  };

  const resetHighlight = (e) => {
    setOnSelect(false);
    // e.target.setStyle(style(e.target.feature));
  };

  const clickHandler = (e) => {
    const data = e.target.feature.properties.gid;
    navigate("/details", {
      state: { areaId: data },
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: clickHandler,
    });
  };

  return (
    <>
      <div id="map">
        <MapContainer
          center={center}
          // maxZoom={11.5}
          zoom={11.5}
          style={{ width: "screen", height: "80vh" }}
        >
          <div className="flex flex-row-reverse min-[240px]:hidden md:flex pt-20 pr-7">
            <div className="card bg-white w-60 shadow-xl z-[999]">
              <div className="px-5 py-4">
                {onSelect ? (
                  <>
                    <h2 className=" text-lg font-bold">
                      {dataById.nama_kelurahan}
                    </h2>
                    {accessToken && (
                      <p className="text-sm">Jumlah Kasus: {totalPas}</p>
                    )}
                    <div className="mt-3">
                      <div className="flex justify-between">
                        <span>Tingkat Literasi</span>
                        <p>{Math.round(hit.persentase_literasi * 100)}%</p>
                      </div>
                      <progress
                        className="progress progress-primary w-full"
                        value={Math.round(hit.persentase_literasi * 100)}
                        max="100"
                      ></progress>
                      <div className="flex justify-between">
                        <span>Stigma Masyarakat</span>
                        <p>{Math.round(hit.persentase_stigma * 100)}%</p>
                      </div>
                      <progress
                        className="progress progress-primary w-full"
                        value={Math.round(hit.persentase_stigma * 100)}
                        max="100"
                      ></progress>
                      <div className="flex justify-between">
                        <span>Tingkat Pengetahuan</span>
                        <p>{Math.round(hit.persentase_pengetahuan * 100)}%</p>
                      </div>
                      <progress
                        className="progress progress-primary w-full"
                        value={Math.round(hit.persentase_pengetahuan * 100)}
                        max="100"
                      ></progress>
                    </div>
                    {kerentanan === "tidak rentan"}
                    {/* <p className="text-sm">Kerentanan: {totalPas}</p> */}
                    <p
                      className={`text-sm font-semibold mt-2 ${
                        kerentanan === "Tidak Rentan"
                          ? "text-[#059335]"
                          : kerentanan === "Cukup Rentan"
                          ? "text-[#FFB800]"
                          : kerentanan === "Rentan"
                          ? "text-[#ff0000]"
                          : kerentanan === "Sangat Rentan"
                          ? "text-black"
                          : ""
                      }`}
                    >
                      Kerentanan: {kerentanan}
                    </p>
                    <div className="space-y-2 mt-2">
                      {intervensi &&
                        intervensi.map((item) => (
                          <p className="text-sm">
                            <span className="font-semibold">Intervensi:</span>{" "}
                            {item.judul_intervensi}
                          </p>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className=" text-lg font-bold">Data</h2>
                    <p className="text-sm">Arahkan mouse ke peta</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <TileLayer
            url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=sO17qhXSqu9o3tn00q0L"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <GeoJSON
            data={statesData}
            onEachFeature={onEachFeature}
            style={style}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
