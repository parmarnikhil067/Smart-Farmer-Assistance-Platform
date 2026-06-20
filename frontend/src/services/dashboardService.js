import axios from "axios";

export const getDashboardStats =
    async() => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const res =
                await axios.get(

                    "https://smart-farmer-backend-p2ap.onrender.com/api/dashboard/stats",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

            return res.data;

        } catch (err) {

            console.log(err);

            return null;

        }

    };