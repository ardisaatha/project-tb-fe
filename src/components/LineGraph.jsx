import React, { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Collapse, Select } from "antd";
import iconGrafik from "../assets/icon-grafik.png";
import iconsSearch from "../assets/search-icons.png";
import { useDispatch, useSelector } from "react-redux";
import { filterPasien } from "../store/actions/pasien";

const LineGraph = () => {
  const [def, setDef] = useState(false);
  const [error, setError] = useState("");
  const [persebaran, setPersebaran] = useState();
  const [kelurahan, setKelurahan] = useState();
  const [fasyankes, setFasyankes] = useState();
  const [tahun, setTahun] = useState();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // dispatch(getPasien());
  //   dispatch(getLocation());
  //   dispatch(getKelurahan());
  //   dispatch(getFaskes());
  // }, [dispatch]);

  const { dataKel, locFaskes } = useSelector(
    (state) => state.locationReducers
  );
  const { data } = useSelector((state) => state.pasienReducers);
  const dataDef = useSelector((state) => state.locationReducers.data);
  dataDef.sort((a, b) => b.jumlah_pasien - a.jumlah_pasien);
  // console.log(dataDef);

  const sortedData = data.sort((a, b) => {
    const months = {
      Januari: 1,
      Februari: 2,
      Maret: 3,
      April: 4,
      Mei: 5,
      Juni: 6,
      Juli: 7,
      Agustus: 8,
      September: 9,
      Oktober: 10,
      November: 11,
      Desember: 12,
    };
    return months[a.bulan] - months[b.bulan];
  });
  const groupedData = {};
  sortedData.forEach((entry) => {
    const month = entry.bulan;
    const gender = entry.jenis_kelamin;

    if (!groupedData[month]) {
      groupedData[month] = { L: 0, P: 0 };
    }

    groupedData[month][gender]++;
  });

  const chartData = Object.keys(groupedData).map((month) => ({
    bulan: month,
    Laki_Laki: groupedData[month]["L"],
    Perempuan: groupedData[month]["P"],
  }));

  const persebaranHandler = (value) => {
    setPersebaran(value);
    if (value === 1) {
      setFasyankes();
    } else {
      setKelurahan();
    }
  };
  const kelurahanHandler = (value) => {
    setKelurahan(value);
  };
  const fasyankesHandler = (value) => {
    setFasyankes(value);
  };
  const tahunHandler = (value) => {
    setTahun(value);
  };

  const filterHandler = async (e) => {
    e.preventDefault();

    const data = {
      tahun,
      id_kelurahan: kelurahan,
      id_fasyankes: fasyankes,
    };
    const res = await dispatch(filterPasien(data))
      .then((response) => ({ response }))
      .catch((error) => ({ error }));

    // console.log(res.response);

    if (res.error) {
      setError(res.error.response.data.message);
    } else {
      setError();
      setDef(true);
    }
  };

  // console.log(def);

  //yang dipake di antd
  const itemsAccordion = [
    {
      key: "1",
      label: <div className="text-white">Tahun</div>,
      children: (
        <Select
          onChange={tahunHandler}
          placeholder=<div className="text-black">Pilih Tahun</div>
          optionFilterProp="children"
          className="w-full"
          options={[
            { value: "2020", label: "2020" },
            { value: "2021", label: "2021" },
            { value: "2022", label: "2022" },
            { value: "2023", label: "2023" },
          ]}
        />
      ),
      showArrow: false,
    },
    {
      key: "2",
      label: <div className="text-white">Persebaran</div>,
      children: (
        <div className="flex flex-col">
          <Select
            showSearch
            onChange={persebaranHandler}
            placeholder=<div className="text-black">Tipe Persebaran</div>
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: 1, label: "Kelurahan" },
              { value: 2, label: "Fasyankes" },
            ]}
          />
          {persebaran === 1 ? (
            <Select
              showSearch
              onChange={kelurahanHandler}
              placeholder=<div className="text-black">Pilih Kelurahan</div>
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={
                dataKel &&
                dataKel.map((item) => ({
                  value: item.id,
                  label: item.nama_kelurahan,
                }))
              }
            />
          ) : persebaran === 2 ? (
            <Select
              showSearch
              onChange={fasyankesHandler}
              placeholder=<div className="text-black">Pilih Fasyankes</div>
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={
                locFaskes &&
                locFaskes.map((item) => ({
                  value: item.id,
                  label: item.nama_fasyankes,
                }))
              }
            />
          ) : (
            <div></div>
          )}
        </div>
      ),
      showArrow: false,
    },
  ];

  return (
    <div className="flex md:flex-row min-[240px]:flex-col min-[240px]:gap-4 md:gap-20">
      <div className="card bg-white drop-shadow-lg md:hidden">
        <div className="card-body ">
          <div className="flex gap-1">
            <img src={iconGrafik} alt="icon-grafik" className="w-6 h-6" />
            <p>Filter</p>
          </div>
          <form>
            <div className="mb-3">
              <div className="bg-[#4F709C] collapse">
                <Collapse items={itemsAccordion} />
              </div>
            </div>
            <div className="justify-center w-full">
              {error && <p className="text-red-500 mb-3 ml-1">{error}</p>}
              <div className="flex flex-row space-x-4">
                <button
                  onClick={filterHandler}
                  className="w-52 btn text-sm bg-[#4F709C] text-white hover:text-white hover:bg-[#4F709C] hover:border-[#4F709C]"
                >
                  <img
                    src={iconsSearch}
                    alt="icon-search"
                    className="w-4 h-4"
                  />
                  Pratinjau
                </button>
                <button
                  onClick={(e) => e.preventDefault(setDef(false))}
                  className="btn btn-square btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card min-[240px]:w-full md:w-2/3 bg-white drop-shadow-lg">
        <div className="md:p-8 min-[240px]:p-3">
          {def ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                // width={800}
                // height={500}
                margin={{ bottom: -5 }}
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 10 }}
                  // angle={-90}
                  // textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Laki_Laki" fill="#8884d8" />
                <Bar dataKey="Perempuan" fill="#20B899" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                // width={800}
                // height={500}
                margin={{ bottom: -5 }}
                data={dataDef}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="nama_kelurahan"
                  tick={{ fontSize: 0 }}
                  angle={-90}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah_pasien" fill="#20B899" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="card bg-white drop-shadow-lg min-[240px]:hidden md:flex">
        <div className="card-body ">
          <div className="flex gap-1">
            <img src={iconGrafik} alt="icon-grafik" className="w-6 h-6" />
            <p>Filter</p>
          </div>
          <form>
            <div className="mb-3">
              <div className="bg-[#4F709C] collapse">
                <Collapse items={itemsAccordion} />
              </div>
            </div>
            <div className="justify-center w-full">
              {error && <p className="text-red-500 mb-3 ml-1">{error}</p>}
              <div className="flex flex-row space-x-4">
                <button
                  onClick={filterHandler}
                  className="w-52 btn text-sm bg-[#4F709C] text-white hover:text-white hover:bg-[#4F709C] hover:border-[#4F709C]"
                >
                  <img
                    src={iconsSearch}
                    alt="icon-search"
                    className="w-4 h-4"
                  />
                  Pratinjau
                </button>
                <button
                  onClick={(e) => e.preventDefault(setDef(false))}
                  className="btn btn-square btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
