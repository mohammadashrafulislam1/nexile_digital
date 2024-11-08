import { Helmet } from "react-helmet";
import Header from "../../../Components/ForAll/Header";
import Hero from "./Hero";

const LandingPage = ()=>{
    return(
    <div>
    {/* Helmet */}
    <Helmet>
    <meta name="description" content="Nexile Digital is a all in one digital solutions. Nexile Digital provides web development, web design, SEO (Search Engine Optimization), Video Editing, UX & UI Design, Figma services."></meta>
    </Helmet>

    {/* Content */}
    <Header/>
    <Hero/>
    </div>
    )
}
export default LandingPage;