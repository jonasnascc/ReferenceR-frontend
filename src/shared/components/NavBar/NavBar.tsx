import React from "react";
import { Container, Grid } from "@mui/material";
import { useContext } from "react";
import { SearchBar } from "../SearchBar";
import { useNavigate } from "react-router-dom";
import { RequireNoAuth } from "../../../context/Auth/RequireNoAuth";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { UserDropdownMenu } from "../UserDropDownMenu/UserDropDownMenu";

import logo from "../../../assets/img/logo.png"
import { Logo, NavBarDiv, LoginButtonContainer, LoginButton} from "./styles";
import { NavigationMenu } from "./NavigationMenu";


export const NavBar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();



    const handleLoginClick = () => {
        navigate("/login");
    }

    return (
        <NavBarDiv>
            <Container>
                <Grid container>
                    <Grid item xs={2}>
                        <div className="align-hor">
                            <a href="/"><Logo src={logo} alt="logo"/></a>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <SearchBar/>
                    </Grid>
                    <Grid item xs={4}>
                        <NavigationMenu/>
                    </Grid>
                    <Grid item xs={1}>
                        <div className="align-vert">
                            <RequireNoAuth>
                                <LoginButtonContainer>
                                    <LoginButton onClick={handleLoginClick}>Sign in</LoginButton>
                                </LoginButtonContainer>
                            </RequireNoAuth>
                            <UserDropdownMenu user={auth.user}/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </NavBarDiv>
    )
}




