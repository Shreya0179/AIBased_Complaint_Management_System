import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [complaints, setComplaints] = useState([]);

  const [aiResult, setAiResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [locationSearch, setLocationSearch] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchComplaints = async () => {

    try {

      let url = "/complaints";

      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }

      const res = await API.get(url);

      setComplaints(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  const searchByLocation = async () => {

    try {

      const res = await API.get(
        `/complaints/search/location?location=${locationSearch}`
      );

      setComplaints(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    fetchComplaints();

  }, [categoryFilter]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/complaints",
        formData
      );

      const aiRes = await API.post(
        "/ai/analyze",
        {
          complaint: formData.description,
        }
      );

      setAiResult(aiRes.data);

      setLoading(false);

      alert("Complaint Added Successfully");

      fetchComplaints();

      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: "",
      });

    } catch (err) {

      setLoading(false);

      console.log(err);

      alert("Error");
    }
  };

  const updateStatus = async (id) => {

    try {

      await API.put(
        `/complaints/${id}`,
        {
          status: "Resolved",
        }
      );

      fetchComplaints();

    } catch (err) {

      console.log(err);
    }
  };

  const deleteComplaint = async (id) => {

    try {

      await API.delete(
        `/complaints/${id}`
      );

      fetchComplaints();

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <div className="container">

      <h2>Complaint Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit">
          Submit Complaint
        </button>

      </form>

      {
        loading && (
          <div className="card">

            <h3>
              Analyzing complaint using AI...
            </h3>

          </div>
        )
      }

      {
        aiResult && (
          <div className="card">

            <h3>AI Analysis Result</h3>

            <p>
              <strong>Priority:</strong>
              {" "}
              {aiResult.priority}
            </p>

            <p>
              <strong>Department:</strong>
              {" "}
              {aiResult.department}
            </p>

            <p>
              <strong>Summary:</strong>
              {" "}
              {aiResult.summary}
            </p>

            <p>
              <strong>Response:</strong>
              {" "}
              {aiResult.response}
            </p>

          </div>
        )
      }

      <h2>Complaint List</h2>

      <div className="card">

        <h3>Filter Complaints</h3>

        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Search by Location"
          value={locationSearch}
          onChange={(e) =>
            setLocationSearch(e.target.value)
          }
        />

        <button onClick={searchByLocation}>
          Search Location
        </button>

        <button
          onClick={() => {

            setCategoryFilter("");

            setLocationSearch("");

            fetchComplaints();
          }}

          style={{
            marginLeft: "10px",
          }}
        >
          Reset
        </button>

      </div>

      {
        complaints.length === 0 ? (

          <div className="card">

            <h3>
              No Complaints Found
            </h3>

          </div>

        ) : (

          complaints.map((item) => (

            <div
              className="card"
              key={item._id}
            >

              <h3>{item.title}</h3>

              <p>
                {item.description}
              </p>

              <p>
                <strong>Category:</strong>
                {" "}
                {item.category}
              </p>

              <p>
                <strong>Location:</strong>
                {" "}
                {item.location}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
                {item.status}
              </p>

              <button
                onClick={() =>
                  updateStatus(item._id)
                }
              >
                Mark Resolved
              </button>

              <button
                onClick={() =>
                  deleteComplaint(item._id)
                }
                style={{
                  marginLeft: "10px",
                  background: "red",
                }}
              >
                Delete
              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default Dashboard;