# Nginx 500 Error Debug Commands

## Check Nginx Error Logs
```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check if nginx config is correct
sudo nginx -t

# Check nginx process
sudo systemctl status nginx
```

## Check Backend Connection
```bash
# Test if nginx can reach backend
curl -v http://localhost:4000/api/health

# Check what's running on port 4000
sudo lsof -i :4000

# Check process list
ps aux | grep node
```

## Fix Commands (Run These)
```bash
# 1. Check current nginx config
sudo nginx -t

# 2. Restart nginx
sudo systemctl restart nginx

# 3. Check if backend is accessible
curl http://localhost:4000/api/health

# 4. If backend works but nginx doesn't, check logs
sudo tail -10 /var/log/nginx/error.log

# 5. Test with simple config
sudo nginx -s reload
```

## Most Likely Issue
The 500 error usually means:
1. Backend is not running on expected port
2. Permission issues
3. SELinux blocking connections
4. Nginx config syntax error

## Quick Fix Commands
```bash
# Method 1: Restart everything
sudo systemctl restart nginx
pm2 restart all

# Method 2: Check permissions
sudo chmod 644 /etc/nginx/sites-available/oneplanetmarket.com
sudo nginx -t && sudo systemctl reload nginx

# Method 3: Check SELinux (if applicable)
sudo setsebool -P httpd_can_network_connect 1
```