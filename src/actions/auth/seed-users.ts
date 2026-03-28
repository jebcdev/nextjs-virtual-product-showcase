import { auth } from "./../../lib/auth"

export const seedInitialUsers=async()=>{
    try {
        const adminUser=await auth.api.signUpEmail({
            body:{
                name:"Admin",
                email:"admin@admin.com",
                password:"123456789",
                role:"ADMIN"
            }
        })
        const normalUser=await auth.api.signUpEmail({
            body:{
                name:"User",
                email:"user@user.com",
                password:"123456789",
                role:"USER"
            }
        })
        return{
            adminUser,
            normalUser
        }
    } catch (error) {
        console.error(error)
    }
}