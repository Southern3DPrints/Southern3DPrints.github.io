function generateLoadstring() {
    const luaCode = document.getElementById("luaInput").value;

    if (!luaCode.trim()) {
        alert("Please enter Lua code.");
        return;
    }

    // Encode Lua code to Base64
    const encoded = btoa(luaCode);

    // Simple Lua Base64 decoder
    const luaLoader = `
local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local function decode(data)
    data = string.gsub(data, '[^'..b..'=]', '')
    return (data:gsub('.', function(x)
        if (x == '=') then return '' end
        local r,f='',(b:find(x)-1)
        for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
        return r
    end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
        if (#x ~= 8) then return '' end
        local c=0
        for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
        return string.char(c)
    end))
end

local code = decode("${encoded}")
loadstring(code)()
`;

    document.getElementById("output").value = luaLoader.trim();
}
