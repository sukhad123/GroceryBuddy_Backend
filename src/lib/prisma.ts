"use server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
export async function createUser(email:string, password: string)
{

    //test if the account exists
    const user1 = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if(user1){return {error:"Account already exists"}}
    const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
        },
    })
}


//create a new group
export async function createGroup(groupName:string){
    const group = await prisma.group.create({
        data:{
            name:groupName
        }
    })
    return group.id;
}
//
export async function getGroupID(email:string){
    const group = await prisma.user.findUnique({
        where:{email:email}
       
    })
    
    return group?.groupId;
}
//add a user in a group
export async function addUser(groupId: number, userEmail: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
        include: {
            group: true,
           
        },
    });

    if (user) {
        // Update the user's groupId
        await prisma.user.update({
            where: { email: userEmail },
            data: {
                groupId: groupId, // Ensure this matches your schema
            },
        });
    } else {
        return { error: "User not found" };
    }
}
export async function validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if(!user){
        return {error: "Doesn't have account"}
    }
    else{
        if(user.password != password)
        {
            return{error:"Password doesn't match"}
        }
    }

}
//get all user with that group id
export async function getAllUserwithGroupId(email:string){
    const groupId = await getGroupID(email);
    const users = await prisma.user.findMany({
        where:{
            groupId:groupId
        },
        select: {
            email: true, // Select only the email field
          },

    })
    return users;
}

// get all users
export async function getAllUsers(user: string) {
    // Fetch the groupId for the given user
    const groupId123: number = await getGroupID(user)?? 0;
  
    // Fetch users whose groupId is not equal to the fetched groupId
    const users = await prisma.user.findMany({
        where: {
          groupId: null, // Fetch users whose groupId is not null
        
        },
      });
      
  
    return users;
  }
  

  //add item
  export async function addItem(itemName:string, category:string,   groupId:number){
    const item = await prisma.item.create({
        data:{
            itemName:itemName,
            itemType:category,
         
            groupId:groupId,
            completed:false,
        }
    })
  }

  //retrieve items with that groupId
  export async function getItems(groupId:number){
    const items = await prisma.item.findMany({
        where:{groupId:groupId},
        select: {
            itemName: true,
            itemType:true,
            
            id:true // Select only the email field
          },
    })
    return items;
  }

  //delete the item for the group
  export  async function deleteItem(itemId:number){
    console.log("Coming item id", itemId);
const item = await prisma.item.delete({
    where:{id:itemId}
})
  }

//update the status of the item with itemid
export async function updateItemStatus(itemId:number){
    const item = await prisma.item.update({
        where:{id:itemId},
        data:{
            completed:true,
        }
    })
}

//retrieve the group name
export async function getGroupName(email: string) {
    try {
        const groupId  = await getGroupID(email);
        if (groupId) {
            const group = await prisma.group.findUnique({
                where: { id: groupId }  
            });

            if (group) {
                return group.name;  
            }
        }

        return null; // Return null if no group is found
    } catch (error) {
        console.error('Error retrieving group data:', error);
        throw new Error('Failed to retrieve group data');
    }
}
