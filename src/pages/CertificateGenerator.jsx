import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import html2pdf from "html2pdf.js";

const CertificateGenerator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [certificateHTML, setCertificateHTML] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      //   const token = localStorage.getItem("token");
      // temperary token used and got it after login using postman
      const token = localStorage.getItem("auth_token");
      console.log(token, "token from localstorage");

      const response = await axios.post(
        "http://localhost:3000/api/certificates/GenerateCertificate", // change to your backend URL
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "text", // VERY IMPORTANT since backend sends HTML
        }
      );

      setCertificateHTML(response.data);
    } catch (error) {
      console.error("Error generating certificate:", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  // Function to download certificate as PDF
  const downloadPDF = () => {
    const element = document.getElementById("certificate-container");
    const opt = {
      margin: 0,
      filename: "certificate.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, backgroundColor: null },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // If certificate is generated, show it instead of form
  if (certificateHTML) {
    return (
      <div className="relative h-auto w-[1020px] mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        {/* Download Button*/}
        <div className="absolute top-4 right-4">
          <button
            onClick={downloadPDF}
            className="bg-[#001f6e] cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-[#001f3f] transition shadow-md"
          >
            Download PDF
          </button>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🎉 Certificate Generated Successfully!
        </h2>

        {/* Certificate Container */}
        <div
          id="certificate-container"
          style={{
            backgroundColor: "#f9fafb",
            color: "#111827",
          }}
          dangerouslySetInnerHTML={{ __html: certificateHTML }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Generate Certificate
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Course Name</label>
          <input
            type="text"
            {...register("courseName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter course name"
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm">Course name is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">From Date</label>
          <input
            type="date"
            {...register("fromDate", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.fromDate && (
            <p className="text-red-500 text-sm">From date is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">To Date</label>
          <input
            type="date"
            {...register("toDate", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.toDate && (
            <p className="text-red-500 text-sm">To date is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Generate Certificate"}
        </button>
      </form>
    </div>
  );
};

export default CertificateGenerator;
