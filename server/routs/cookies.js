const express = require("express");
const router = express.Router();

router.get("/", async(req, res)=>{
    res.json("cookies work");
})
router.get("/test", async(req, res)=>{
    res.cookie("myCookie3", "vanila cake 555", {
        httpOnly: false,
        expires: new Date(Date.now()+1000*60*60)
    }).json("cookies saved");
})
router.get("/check", async(req, res)=>{
    if(req.cookies["myCookie3"]){
        return res.json({msg: req.cookies["myCookie3"]})
    }else{
        res.json({msg: "no cookie"})
    }
    
})
router.delete("/delete/:cookieName", async (req, res) => {
    const cookieName = req.params.cookieName;
    if (req.cookies[cookieName]) {
      res.clearCookie(cookieName);
      res.json({ msg: `Cookie "${cookieName}" deleted` });
    } else {
      res.json({ msg: `Cookie "${cookieName}" not found` });
    }
  });
module.exports = router;
