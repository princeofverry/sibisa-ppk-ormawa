import React from "react";

type AccordionItemType = {
  title: string;
  content: React.ReactNode;
};

const accordionData: AccordionItemType[] = [
  {
    title: "Siapkan Tempat Sampah",
    content: (
      <p>
        Sediakan minimal 2 tempat sampah yang berbeda warna sebagai pembeda dan
        diberi tulisan sesuai fungsi tempat sampah tersebut.
      </p>
    ),
  },
  {
    title: "Kenali Jenis Sampah",
    content: (
      <ul className="list-outside">
        <li>
          &#x2022; Sampah Organik: Sisa makanan, kulit buah-buahan, sayuran,
          daun-daun kering, serbuk gergaji, dan kotoran hewan.
        </li>
        <li>
          &#x2022; Sampah Anorganik: Plastik (botol, kemasan makanan), kertas
          (koran, majalah), kaca (botol, gelas), logam (kaleng, alumunium foil),
          tekstil (kain, pakaian), dan sampah berbahaya (baterai, lampu
          fluorescent).
        </li>
      </ul>
    ),
  },
  {
    title: "Proses Pemilahan",
    content: (
      <p>
        Mencuci sampah sebelum dibuang ke tempat pemilahan sampah dan pisahkan
        sampah yang berbahaya.
      </p>
    ),
  },
  {
    title: "Pengelolaan Sampah",
    content: (
      <div>
        <h1>Mengelola sampai sesuai jenisnya seperti:</h1>
        <ul className="list-outside">
          <li>
            &#x2022; Sampah Organik dapat dijadikan kompos sebagai pupuk tanaman
            aau berikan pada maggot untuk dijadikan pakan ternak.
          </li>
          <li>
            &#x2022; Sampah Anorganik dapat dikumpulkan dan dikirim ke bank
            sampah. Jenis sampah ini juga dapat didaur ulang dan  dimanfaatkan
            untuk membuat kerajinan tangan.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Libatkan semua anggota keluarga",
    content: (
      <p>
        Ajak seluruh anggota keluarga untuk berpartisipasi dalam memilah sampah.
      </p>
    ),
  },
  {
    title: "Konsisten dan Disiplin",
    content: (
      <p>
        Buat jadwal rutin untuk mengosongkan tempat sampah dan membawa sampah ke
        tempat pembuangan atau bank sampah.
      </p>
    ),
  },
];

export default accordionData;
