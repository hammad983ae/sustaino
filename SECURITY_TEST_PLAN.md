# 🔒 Security Test Plan - Verify All Fixes

## 1. ✅ Database RLS & Policies Test

### Test A: Property Assessments Protection
```sql
-- Login as User A, try to access User B's data
SELECT * FROM property_assessments WHERE user_id != auth.uid();
-- ✅ EXPECTED: Returns 0 rows (blocked by RLS)

-- Try to insert with wrong user_id
INSERT INTO property_assessments (user_id, job_id) VALUES ('fake-uuid', gen_random_uuid());
-- ✅ EXPECTED: Error "new row violates row-level security policy"
```

### Test B: Anonymous Access Blocked
```sql
-- Switch to anon role (or test without auth)
SELECT * FROM property_assessments;
-- ✅ EXPECTED: Error "permission denied" or 0 rows

SELECT * FROM market_analysis;
-- ✅ EXPECTED: Error "permission denied" or 0 rows
```

## 2. 📂 Storage Security Test

### Test A: Cross-User File Access
1. Login as User A
2. Try to access: `property-images/{user-b-id}/job_123/file.jpg`
3. ✅ EXPECTED: 403 Forbidden or file not found

### Test B: Correct User Access
1. Login as User A  
2. Upload to: `property-images/{user-a-id}/job_123/file.jpg`
3. ✅ EXPECTED: Success
4. Download same file
5. ✅ EXPECTED: Success

## 3. 🔐 Auth Security Test

### Test A: OTP Expiry
1. Request magic link/OTP
2. Wait 6+ minutes
3. Try to use expired link
4. ✅ EXPECTED: "Link expired" error

### Test B: Password Policy
1. Try weak password: "123456"
2. ✅ EXPECTED: Rejected
3. Try strong password: "SecurePass123!"
4. ✅ EXPECTED: Accepted

## 4. ⚙️ Postgres Config Test

### Test A: Search Path Lock
```sql
SHOW search_path;
-- ✅ EXPECTED: "$user", public (locked)

-- Try to change it
SET search_path = malicious_schema, public;
-- ✅ EXPECTED: Permission denied or reverts after session
```

### Test B: Version Check
```sql
SELECT version();
-- ✅ EXPECTED: Latest Postgres version (15.x or newer)
```

## 5. 🚨 End-to-End Security Flow Test

### Complete User Journey Test:
1. **Signup** → strong password required ✅
2. **Upload file** → only to own folder ✅  
3. **View assessments** → only own data visible ✅
4. **Generate report** → includes only own data ✅
5. **Download PDF** → accessible only to owner ✅

### Cross-User Attack Test:
1. User A creates assessment with job_id = "test123"
2. User B tries to:
   - View assessment "test123" → ❌ BLOCKED
   - Upload to User A's folder → ❌ BLOCKED  
   - Generate report for "test123" → ❌ BLOCKED
3. ✅ EXPECTED: All attempts fail with permission errors

## 6. 🔍 Quick Security Scan

Run this in Supabase SQL to verify policies exist:
```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('property_assessments', 'market_analysis', 'auctions', 'profiles')
AND rowsecurity = true;
-- ✅ EXPECTED: All 4 tables show rowsecurity = true

-- Check policies exist
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('property_assessments', 'market_analysis', 'auctions', 'profiles');
-- ✅ EXPECTED: Multiple policies listed for each table
```

## 7. 📊 Final Verification

### Before/After Comparison:
- ❌ **Before**: Anonymous users could read investment data
- ✅ **After**: Only authenticated owners see their data

- ❌ **Before**: Users could access other users' files  
- ✅ **After**: Strict folder-based access control

- ❌ **Before**: Weak passwords accepted
- ✅ **After**: Strong password policy enforced

- ❌ **Before**: Long OTP expiry (security risk)
- ✅ **After**: Short 5-10 minute expiry

## 8. 🎯 Success Criteria

All tests pass = **Security hardening complete** ✅

If any test fails:
1. Re-run the failed SQL policy
2. Check Supabase Auth settings  
3. Verify storage bucket configuration
4. Repeat test until ✅

---

**Time to complete**: ~15 minutes  
**Result**: Your platform is now hardened against the reported security issues.